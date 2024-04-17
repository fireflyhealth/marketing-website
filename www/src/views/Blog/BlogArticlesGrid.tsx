import React, { FC } from 'react';
import cn from 'classnames';
import { BlogArticleLinkData } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { formatSanityDate } from '@/utils/text';
import { Link } from '@/atoms/Link';
import { BlogArticlesSharedProps } from './shared';
import { BlogArticlesGridItemWrapper, BlogArticlesGridWrapper } from './styles';

type BlogArticlesGridItemProps = {
  article: BlogArticleLinkData;
};

const BlogArticlesGridItem: FC<BlogArticlesGridItemProps> = ({ article }) => {
  return (
    <Link link={article} className="element-focus hover:opacity-70">
      <div className={cn(BlogArticlesGridItemWrapper)}>
        <div>
          <SanityImage
            image={article.thumbnail}
            sizes={['100vw', '50vw', '35vw']}
            aspectRatio={3 / 4}
          />
        </div>
        <div className="py-3 font-size-8 theme-text-color-secondary">
          {formatSanityDate(article.publishDate)}
        </div>
        <div className="font-size-7 font-trust">{article.title}</div>
      </div>
    </Link>
  );
};

export const BlogArticlesGrid: FC<BlogArticlesSharedProps> = ({
  currentPage,
}) => {
  /** TODO: Maybe add skeletons here. However, users will only see an empty state
   * if they switch to an article tab *very quickly* after initial load. */
  if (!currentPage) return null;
  return (
    <div className={cn(BlogArticlesGridWrapper)}>
      {currentPage.articles.map((article) => (
        <BlogArticlesGridItem key={article.slug.current} article={article} />
      ))}
    </div>
  );
};
