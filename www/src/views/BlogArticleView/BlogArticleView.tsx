import React, { FC } from 'react';
import { BlogArticle } from '@/types/sanity';
import { ArticleHeader } from '@/components/ArticleHeader';

type BlogArticleViewProps = {
  article: BlogArticle;
};

export const BlogArticleView: FC<BlogArticleViewProps> = ({ article }) => {
  return (
    <div>
      <ArticleHeader articleHeader={article} />
    </div>
  );
};
