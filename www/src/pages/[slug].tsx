import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { GenericPage } from '@/types/sanity';
import { Sanity } from '@/lib/sanity/client';
import { PageView } from '../views/PageView/PageView';

type PageProps = {
  page: GenericPage;
};

type PageParams = {
  slug: string;
};

const Page: FC<PageProps> = ({ page }) => {
  return <PageView page={page} />;
};

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
  const slug = params?.slug;
  if (!slug || typeof slug !== 'string') {
    /* This will never happen, but keeps typescript happy */
    throw new Error('Slug param is not a string');
  }
  const page = await Sanity.page.get(slug);
  return {
    props: {
      page,
    },
  };
};

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const pages = await Sanity.page.getSlugs();
  const paths = pages.map((page) => ({
    params: { slug: page.slug.current },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
