import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { PageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import * as Sanity from '@/lib/sanity';
import { Practitioner } from '@/types/sanity';
import { ProviderPageView } from '@/views/ProviderView';

type ProviderPageProps = PageProps & {
  practitioner: Practitioner;
};

const PractitionerPage: FC<ProviderPageProps> = ({ practitioner }) => {
  return (
    <>
      {/* TODO: PractitionerMetadata */}
      {/* TODO: PractitionerView */}
      <ProviderPageView provider={practitioner} />
    </>
  );
};

type PageParams = {
  practitionerSlug: string;
};

export const getStaticProps: GetStaticProps<
  ProviderPageProps,
  PageParams
> = async ({ params }) => {
  const practitionerSlug = params?.practitionerSlug;
  if (!practitionerSlug || typeof practitionerSlug !== 'string') {
    /* This will never happen, but keeps typescript happy */
    throw new Error('practitionerSlug param is not a string');
  }
  const [siteSettings, practitioner] = await Promise.all([
    Sanity.siteSettings.get(),
    Sanity.practitionerPage.get(practitionerSlug),
  ]);

  if (!practitioner) {
    return { notFound: true };
  }
  return {
    props: {
      practitioner,
      siteSettings,
    },
    revalidate: RevalidationTime.Medium,
  };
};

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const practitionerPages = await Sanity.practitionerPage.getSlugInfo();

  const paths = practitionerPages.map((practitioner) => ({
    params: { practitionerSlug: practitioner.slug.current },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export default PractitionerPage;
