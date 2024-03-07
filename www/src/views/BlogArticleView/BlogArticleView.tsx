import React, { FC } from 'react';
import cn from 'classnames';
import { BlogArticle } from '@/types/sanity';
import { ArticleHeader } from '@/components/ArticleHeader';
import { RichText } from '@/components/RichText';

type BlogArticleViewProps = {
  article: BlogArticle;
};

export const BlogArticleView: FC<BlogArticleViewProps> = ({ article }) => {
  return (
    <div className={cn('BlogArticleView px-4 md:px-8 lg:px-12 mb-16 lg:mb-40')}>
      {/* TODO replace this with artible header */}
      <ArticleHeader articleHeader={article} />
      <article className={cn('flex flex-col items-center')}>
        {article.deck && (
          <RichText
            className={cn('font-trust w-full md:w-2/3 lg:w-5/6 lg:mb-16')}
            content={article.deck}
            fontSize="font-size-6--quote"
            textColor="text-sienna"
          />
        )}
        {article.content && (
          <RichText
            className={cn('ArticleRichText w-full md:w-2/3 lg:w-4/6')}
            content={article.content}
          />
        )}
      </article>
    </div>
  );
};
