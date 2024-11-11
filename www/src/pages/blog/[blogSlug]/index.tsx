import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { PageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { BlogPageView } from '@/views/Blog/BlogPageView';
import { Blog, BlogArticlePagination } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { BlogMetadata } from '@/components/Metadata/BlogMetadata';
import { QueryConfig } from '@/lib/sanity';

export type BlogPageProps = PageProps & {
  blog: Blog;
  initialArticlesPage: BlogArticlePagination;
};

const BlogPage: FC<BlogPageProps> = ({ blog, initialArticlesPage }) => {
  return (
    <>
      <BlogMetadata blog={blog} />
      <BlogPageView blog={blog} initialArticlesPage={initialArticlesPage} />
    </>
  );
};

type BlogPageParams = {
  blogSlug: string;
};

export const createGetStaticProps =
  (config?: QueryConfig): GetStaticProps<BlogPageProps, BlogPageParams> =>
  async ({ params }) => {
    const blogSlug = params?.blogSlug;
    if (!blogSlug || typeof blogSlug !== 'string') {
      /* This will never happen, but keeps typescript happy */
      throw new Error('blogSlug param is not a string');
    }

    const [siteSettings, blog] = await Promise.all([
      Sanity.siteSettings.get(),
      Sanity.blog.get(blogSlug, config),
    ]);

    const initialArticlesPage =
      blog?.articleSortOrder == 'sortManually'
        ? await Sanity.blog.getManuallySortedBlogArticles(blogSlug)
        : await Sanity.blog.getBlogArticles(blogSlug);

    const navigationOverrides = blog?.navigationOverrides;

    if (!blog) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        siteSettings,
        blog,
        initialArticlesPage,
        navigationOverrides: navigationOverrides || null,
      },
      revalidate: RevalidationTime.Medium,
    };
  };

export const getStaticProps = createGetStaticProps();

export const getStaticPaths: GetStaticPaths<BlogPageParams> = async () => {
  const blogs = await Sanity.blog.getSlugInfo();
  const paths = blogs.map((blog) => ({
    params: { blogSlug: blog.slug.current },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export default BlogPage;
