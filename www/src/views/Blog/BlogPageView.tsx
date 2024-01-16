import React, { FC } from 'react';
import { Blog } from '@/types/sanity';

type BlogPageViewProps = {
  blog: Blog;
};

export const BlogPageView: FC<BlogPageViewProps> = ({ blog }) => {
  return <div>{blog.title}</div>;
};
