import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { PageProps as CommonPageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { SubPage } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { PageView } from '@/views/PageView';
import { PageMetadata } from '@/components/Metadata/PageMetadata';
import { QueryConfig } from '@/lib/sanity';

export type PageProps = CommonPageProps & {
  subPage: SubPage;
};

export type PageParams = {
  pageSlug: string;
  subpageSlug: string;
};

const Page: FC<PageProps> = ({ subPage }) => {
  return (
    <>
      <PageMetadata page={subPage} />
      <PageView page={subPage} />
    </>
  );
};

export const createGetStaticProps =
  (config?: QueryConfig): GetStaticProps<PageProps, PageParams> =>
  async ({ params }) => {
    const pageSlug = params?.pageSlug;
    const subpageSlug = params?.subpageSlug;
    if (!pageSlug || typeof pageSlug !== 'string') {
      /* This will never happen, but keeps typescript happy */
      throw new Error('pageSlug param is not a string');
    }

    if (!subpageSlug || typeof subpageSlug !== 'string') {
      /* This will never happen, but keeps typescript happy */
      throw new Error('subpageSlug param is not a string');
    }
    const [siteSettings, subPage] = await Promise.all([
      Sanity.siteSettings.get(),
      Sanity.subPage.get(pageSlug, subpageSlug, config),
    ]);

    const navigationOverrides = subPage?.navigationOverrides;

    if (!subPage) {
      return { notFound: true };
    }
    return {
      props: {
        subPage,
        siteSettings,
        navigationOverrides: navigationOverrides || null,
      },
      revalidate: RevalidationTime.Medium,
    };
  };

export const getStaticProps = createGetStaticProps();

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const pages = await Sanity.page.getSlugInfo();
  const paths = Sanity.subPage
    .getSlugParams(pages)
    .map((params) => ({ params }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
