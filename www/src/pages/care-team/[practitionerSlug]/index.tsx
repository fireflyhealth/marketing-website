import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { PageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import * as Sanity from '@/lib/sanity';
import { LinkableDocumentData, Practitioner } from '@/types/sanity';
import { PageMetadata } from '@/components/Metadata/ProviderMetadata';
import { ProviderPageView } from '@/views/ProviderView';

type ProviderPageProps = PageProps & {
  practitioner: Practitioner;
  allProvidersBackLink: LinkableDocumentData;
};

const ProviderPage: FC<ProviderPageProps> = ({
  practitioner,
  allProvidersBackLink,
}) => {
  return (
    <>
      <PageMetadata provider={practitioner} />
      <ProviderPageView
        provider={practitioner}
        allProvidersBackLink={allProvidersBackLink}
      />
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
    Sanity.providerPage.get(practitionerSlug),
  ]);

  const allProvidersBackLink = siteSettings.allProvidersBackLink;

  if (!practitioner) {
    return { notFound: true };
  }
  return {
    props: {
      practitioner,
      allProvidersBackLink,
      siteSettings,
    },
    revalidate: RevalidationTime.Medium,
  };
};

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const providerPages = await Sanity.providerPage.getSlugInfo();

  const paths = providerPages.map((practitioner) => ({
    params: { practitionerSlug: practitioner.slug.current },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export default ProviderPage;
