import React, { FC } from 'react';
import cn from 'classnames';
import { BlogArticleLinkData } from '@/types/sanity';
import { formatSanityDate } from '@/utils/text';
import { RichText } from '@/components/RichText';
import { Link } from '@/atoms/Link';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { BlogArticlesSharedProps } from './shared';
import {
  BlogArticlesListDate,
  BlogArticlesListItemWrapper,
  BlogArticlesListReadMore,
  BlogArticlesListText,
} from './styles';

type BlogArticlesListItemProps = {
  article: BlogArticleLinkData;
};

const BlogArticlesListItem: FC<BlogArticlesListItemProps> = ({ article }) => {
  return (
    <li className={cn(BlogArticlesListItemWrapper)}>
      <div className={cn(BlogArticlesListText)}>
        <div className="font-size-6 font-trust pb-6">{article.title}</div>
        <RichText
          fontSize="font-size-8"
          textColor="theme-text-color-secondary"
          content={article.blurb}
        />
      </div>
      <div className={cn(BlogArticlesListDate)}>
        {formatSanityDate(article.publishDate)}
      </div>
      <div className={cn(BlogArticlesListReadMore)}>
        <Link
          link={article}
          className="BlogArticleList__link"
          ariaLabel={`Navigate to article: ${article.title}`}
        >
          <span className="flex flex-row items-center">
            <span>Read More</span>
            <SimpleIcon
              wrapperStyles="ml-[0.5em] text-[0.8em]"
              type="arrow-right"
            />
          </span>
        </Link>
      </div>
    </li>
  );
};

export const BlogArticlesList: FC<BlogArticlesSharedProps> = ({
  currentPage,
}) => {
  /** TODO: Maybe add skeletons here. However, users will only see an empty state
   * if they switch to an article tab *very quickly* after initial load. */
  if (!currentPage) return null;
  return (
    <ul>
      {currentPage.articles.map((article) => (
        <BlogArticlesListItem key={article.slug.current} article={article} />
      ))}
    </ul>
  );
};
