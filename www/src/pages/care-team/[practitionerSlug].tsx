import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { PageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import * as Sanity from '@/lib/sanity';
import { Practitioner } from '@/types/sanity';

type PractitionerPageProps = PageProps & {
  practitioner: Practitioner;
};

const PractitionerPage: FC<PractitionerPageProps> = ({ practitioner }) => {
  return (
    <>
      {/* TODO: PractitionerMetadata */}
      {/* TODO: PractitionerView */}
      <h1>{practitioner.name}</h1>
    </>
  );
};

type PageParams = {
  practitionerSlug: string;
};

export const getStaticProps: GetStaticProps<
  PractitionerPageProps,
  PageParams
> = async ({ params }) => {
  const practitionerSlug = params?.practitionerSlug;
  if (!practitionerSlug || typeof practitionerSlug !== 'string') {
    /* This will never happen, but keeps typescript happy */
    throw new Error('practitionerSlug param is not a string');
  }
  const [siteSettings, practitioner] = await Promise.all([
    Sanity.siteSettings.get(),
    /* TODO: actually fetch from sanity */
    { name: 'Practitioner Name' } as Practitioner,
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
  return {
    /* TODO actually get the slugs */
    paths: [{ params: { practitionerSlug: 'some-name' } }],
    fallback: 'blocking',
  };
};

export default PractitionerPage;