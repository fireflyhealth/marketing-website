import React, { FC } from 'react';

import { GetStaticPaths } from 'next';
import { GetStaticProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { Blog, BlogArticle } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { BlogArticleView } from '@/views/Blog/BlogArticleView';
import { BlogArticleMetadata } from '@/components/Metadata/BlogArticleMetadata';

type PageProps = {
  article: BlogArticle;
};

type PageParams = {
  blogSlug: string;
  articleSlug: string;
};

const Page: FC<PageProps> = ({ article }) => {
  return (
    <>
      <BlogArticleMetadata article={article} />
      <BlogArticleView article={article} />
    </>
  );
};

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
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
    Sanity.blog.getArticle(blogSlug, articleSlug),
  ]);
  if (!article) {
    return { notFound: true };
  }
  return {
    props: {
      article,
      siteSettings,
    },
    revalidate: RevalidationTime.Medium,
  };
};

const getSlugParams = (blogs: Blog[]): PageParams[] =>
  blogs.reduce<PageParams[]>((slugInfoArray, blog) => {
    const blogSlug = blog.slug.current;

    if (blog.articles && blog.articles.length > 0) {
      const articleSlugs = blog.articles.map((article) => article.slug.current);
      const articleInfos = articleSlugs.map((articleSlug) => ({
        blogSlug,
        articleSlug,
      }));
      return [...slugInfoArray, ...articleInfos];
    } else {
      return slugInfoArray;
    }
  }, []);

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const blogs = await Sanity.blog.getSlugInfo();
  const paths = getSlugParams(blogs).map((params) => ({ params }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Page;
