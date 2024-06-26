import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { PageProps as CommonPageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { GenericPage } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { PageView } from '@/views/PageView';
import { PageMetadata } from '@/components/Metadata/PageMetadata';
import { QueryConfig } from '@/lib/sanity';

export type PageProps = CommonPageProps & {
  page: GenericPage;
};

export type PageParams = {
  pageSlug: string;
};

const Page: FC<PageProps> = ({ page }) => {
  return (
    <>
      <PageMetadata page={page} />
      <PageView page={page} />
    </>
  );
};

export const createGetStaticProps =
  (config?: QueryConfig): GetStaticProps<PageProps, PageParams> =>
  async ({ params }) => {
    const pageSlug = params?.pageSlug;
    if (!pageSlug || typeof pageSlug !== 'string') {
      /* This will never happen, but keeps typescript happy */
      throw new Error('pageSlug param is not a string');
    }

    const [siteSettings, page] = await Promise.all([
      Sanity.siteSettings.get(),
      Sanity.page.get(pageSlug, config),
    ]);

    const navigationOverrides = page?.navigationOverrides;

    if (!page) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        page,
        siteSettings,
        navigationOverrides: navigationOverrides || null,
      },
      revalidate: RevalidationTime.Medium,
    };
  };

export const getStaticProps = createGetStaticProps();

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const pages = await Sanity.page.getSlugInfo();
  const paths = pages.map((page) => ({
    params: { pageSlug: page.slug.current },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
