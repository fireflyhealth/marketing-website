import React, { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { BlogPageView } from '@/views/Blog/BlogPageView';
import { Blog } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';

type BlogPageProps = {
  blog: Blog;
};

type BlogPageParams = {
  blogSlug: string;
};

const BlogPage: FC<BlogPageProps> = ({ blog }) => {
  return <BlogPageView blog={blog} />;
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

  const blog = await Sanity.blog.get(blogSlug);
  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
    },
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
