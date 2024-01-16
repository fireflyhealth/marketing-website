import React, { FC } from 'react';
import { BlogArticle } from '@/types/sanity';

type BlogArticleViewProps = {
  article: BlogArticle;
};

export const BlogArticleView: FC<BlogArticleViewProps> = ({ article }) => {
  return <div>{article.title}</div>;
};
