import React, { FC } from 'react';
import cn from 'classnames';
import { BlogArticle } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { formatSanityDate } from '@/utils/text';
import { Link } from '@/atoms/Link';
import { BlogArticlesSharedProps } from './shared';
import { BlogArticlesGridItemWrapper, BlogArticlesGridWrapper } from './styles';

type BlogArticlesGridItemProps = {
  article: BlogArticle;
};

const BlogArticlesGridItem: FC<BlogArticlesGridItemProps> = ({ article }) => {
  return (
    <Link link={article}>
      <div className={cn(BlogArticlesGridItemWrapper)}>
        <div>
          <SanityImage
            image={article.thumbnail}
            sizes={['100vw', '50vw', '35vw']}
            aspectRatio={3 / 4}
          />
        </div>
        <div className="py-6 font-size-8 theme-text-color-secondary">
          {formatSanityDate(article.publishDate || article._updatedAt)}
        </div>
        <div className="font-size-6 font-trust">{article.title}</div>
      </div>
    </Link>
  );
};

export const BlogArticlesGrid: FC<BlogArticlesSharedProps> = ({ articles }) => {
  return (
    <div className={cn(BlogArticlesGridWrapper)}>
      {articles.map((article) => (
        <BlogArticlesGridItem key={article._id} article={article} />
      ))}
    </div>
  );
};
