import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { PageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import * as Sanity from '@/lib/sanity';
import { Practitioner } from '@/types/sanity';
import { PageMetadata } from '@/components/Metadata/ProviderMetadata';
import { ProviderPageView } from '@/views/ProviderView';
import { QueryConfig } from '@/lib/sanity';

type ProviderPageProps = PageProps & {
  practitioner: Practitioner;
};

const ProviderPage: FC<ProviderPageProps> = ({ practitioner }) => {
  return (
    <>
      <PageMetadata provider={practitioner} />
      <ProviderPageView provider={practitioner} />
    </>
  );
};

type PageParams = {
  practitionerSlug: string;
};

export const createGetStaticProps =
  (config?: QueryConfig): GetStaticProps<ProviderPageProps, PageParams> =>
  async ({ params }) => {
    const practitionerSlug = params?.practitionerSlug;
    if (!practitionerSlug || typeof practitionerSlug !== 'string') {
      /* This will never happen, but keeps typescript happy */
      throw new Error('practitionerSlug param is not a string');
    }
    const [siteSettings, practitioner] = await Promise.all([
      Sanity.siteSettings.get(),

      Sanity.providerPage.get(practitionerSlug, config),
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

export const getStaticProps = createGetStaticProps();

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
