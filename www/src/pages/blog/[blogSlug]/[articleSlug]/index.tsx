import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { PageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { BlogArticle, BlogWithArticles } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { BlogArticleView } from '@/views/BlogArticleView/BlogArticleView';
import { BlogArticleMetadata } from '@/components/Metadata/BlogArticleMetadata';
import { QueryConfig } from '@/lib/sanity';

export type BlogPageProps = PageProps & {
  article: BlogArticle;
};

export type PageParams = {
  blogSlug: string;
  articleSlug: string;
};

const Page: FC<BlogPageProps> = ({ article }) => {
  return (
    <>
      <BlogArticleMetadata article={article} />
      <BlogArticleView article={article} />
    </>
  );
};

export const createGetStaticProps =
  (config?: QueryConfig): GetStaticProps<BlogPageProps, PageParams> =>
  async ({ params }) => {
    const blogSlug = params?.blogSlug;
    const articleSlug = params?.articleSlug;
    if (!blogSlug || typeof blogSlug !== 'string') {
      /* This will never happen, but keeps typescript happy */
      throw new Error('blogSlug param is not a string');
    }

    if (!articleSlug || typeof articleSlug !== 'string') {
      /* This will never happen, but keeps typescript happy */
      throw new Error('articleSlug param is not a string');
    }
    const [siteSettings, article] = await Promise.all([
      Sanity.siteSettings.get(),
      Sanity.blog.getArticle(blogSlug, articleSlug, config),
    ]);

    const navigationOverrides = article?.navigationOverrides;

    if (!article) {
      return { notFound: true };
    }
    return {
      props: {
        article,
        siteSettings,
        navigationOverrides: navigationOverrides || null,
      },
      revalidate: RevalidationTime.Medium,
    };
  };

export const getStaticProps = createGetStaticProps();

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const blogs = await Sanity.blog.getSlugInfo();
  const paths = Sanity.blog.getSlugParams(blogs).map((params) => ({ params }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
