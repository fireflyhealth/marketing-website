import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { GenericPage } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { PageView } from '@/views/PageView';

type PageProps = {
  page: GenericPage;
};

type PageParams = {
  pageSlug: string;
};

const Page: FC<PageProps> = ({ page }) => {
  return <PageView page={page} />;
};

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
  const pageSlug = params?.pageSlug;
  if (!pageSlug || typeof pageSlug !== 'string') {
    /* This will never happen, but keeps typescript happy */
    throw new Error('pageSlug param is not a string');
  }

  const page = await Sanity.page.get(pageSlug);
  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page,
    },
  };
};

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
