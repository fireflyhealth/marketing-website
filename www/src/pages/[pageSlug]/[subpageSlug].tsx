import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { PageProps as CommonPageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { GenericPage, SubPage } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { PageView } from '@/views/PageView';
import { PageMetadata } from '@/components/Metadata/PageMetadata';

type PageProps = CommonPageProps<{
  subPage: SubPage;
}>;

type PageParams = {
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

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
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
    Sanity.subPage.get(pageSlug, subpageSlug),
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

const getSlugParams = (parentPages: GenericPage[]): PageParams[] =>
  parentPages.reduce<PageParams[]>((slugInfoArray, parentPage) => {
    const pageSlug = parentPage.slug.current;

    if (parentPage.subPages && parentPage.subPages.length > 0) {
      const subpageSlugs = parentPage.subPages.map(
        (subPage) => subPage.slug.current,
      );
      const subPageInfos = subpageSlugs.map((subpageSlug) => ({
        pageSlug,
        subpageSlug,
      }));
      return [...slugInfoArray, ...subPageInfos];
    } else {
      return slugInfoArray;
    }
  }, []);

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const pages = await Sanity.page.getSlugInfo();
  const paths = getSlugParams(pages).map((params) => ({ params }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
