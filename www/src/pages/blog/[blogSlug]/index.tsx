import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { PageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { BlogPageView } from '@/views/Blog/BlogPageView';
import { Blog } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { BlogMetadata } from '@/components/Metadata/BlogMetadata';

type BlogPageProps = PageProps<{
  blog: Blog;
}>;

type BlogPageParams = {
  blogSlug: string;
};

const BlogPage: FC<BlogPageProps> = ({ blog }) => {
  return (
    <>
      <BlogMetadata blog={blog} />
      <BlogPageView blog={blog} />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  BlogPageProps,
  BlogPageParams
> = async ({ params }) => {
  const blogSlug = params?.blogSlug;
  if (!blogSlug || typeof blogSlug !== 'string') {
    /* This will never happen, but keeps typescript happy */
    throw new Error('blogSlug param is not a string');
  }

  const [siteSettings, blog] = await Promise.all([
    Sanity.siteSettings.get(),
    Sanity.blog.get(blogSlug),
  ]);

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
      navigationOverrides,
    },
    revalidate: RevalidationTime.Medium,
  };
};

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
