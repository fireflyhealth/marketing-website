import React, { FC } from 'react';
import cn from 'classnames';
import { BlogArticle, BlogArticleLinkData } from '@/types/sanity';
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
        {formatSanityDate(article.publishDate || article._updatedAt)}
      </div>
      <div className={cn(BlogArticlesListReadMore)}>
        <Link link={article}>
          <span className="flex flex-row items-center">
            Read More
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
  return (
    <ul>
      {currentPage.articles.map((article) => (
        <BlogArticlesListItem key={article.slug.current} article={article} />
      ))}
    </ul>
  );
};
