import React, { FC } from 'react';
import { Blog } from '@/types/sanity';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';

type BlogPageViewProps = {
  blog: Blog;
};

export const BlogPageView: FC<BlogPageViewProps> = ({ blog }) => {
  return (
    <div>
      <HeaderArea block={blog.header} />
    </div>
  );
};
