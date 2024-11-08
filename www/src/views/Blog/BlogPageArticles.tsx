import React, { FC, useRef } from 'react';
import cn from 'classnames';
import {
  Blog,
  ArticleSortOrder,
  BlogArticleLayout,
  BlogArticlePagination,
  BlogArticleTagGroup,
  Maybe,
} from '@/types/sanity';
import { Status } from '@/constants';
import { Button } from '@/atoms/Button';
import { useBlogArticlePagination } from '@/hooks/useBlogArticlePagination';
import { BlogArticlesList } from './BlogArticlesList';
import { BlogArticlesGrid } from './BlogArticlesGrid';

type BlogPageArticlesInnerProps = {
  currentPage: Maybe<BlogArticlePagination>;
  goNext: () => Promise<void>;
  goPrev: () => Promise<void>;
  articleLayout: BlogArticleLayout;
  paginationStatus: Status;
  sortOrder: ArticleSortOrder;
};

/* The inner UI, which does not deal with fetching the data itself.
 * Separated and exported as its own component for easier testing. */
export const BlogPageArticlesInner: FC<BlogPageArticlesInnerProps> = ({
  currentPage,
  goNext,
  goPrev,
  articleLayout,
  paginationStatus,
  sortOrder,
}) => {
  const blogArticlesRef = useRef<HTMLDivElement>(null);
  const scrollToArticlesTop = () => {
    if (!blogArticlesRef.current) return;
    const scrollTop = window.document.scrollingElement?.scrollTop || 0;
    const articleTop =
      blogArticlesRef.current.getBoundingClientRect().top - 20 + scrollTop;
    window.scrollTo({
      top: articleTop,
      behavior: 'smooth',
    });
  };
  const handleGoNext = async () => {
    await goNext();
    scrollToArticlesTop();
  };
  const handleGoPrev = async () => {
    await goPrev();
    scrollToArticlesTop();
  };

  const hasMultiplePages = !currentPage
    ? /* If there is no current page, we have yet to load the initial one.
       * Return false so we do not render the buttons. */
      false
    : /* If we are on the first page, check to see if there is a
       * second one. */
      currentPage.page === 0
      ? currentPage.hasNextPage
      : /* Otherwise, we are on a different page, so there are
         * certainly multiple pages. */
        true;

  return (
    <div className="pt-2">
      <div
        ref={blogArticlesRef}
        className={cn(
          paginationStatus === Status.Pending
            ? 'opacity-70 pointer-events-none'
            : '',
        )}
      >
        {articleLayout === 'list' ? (
          <BlogArticlesList currentPage={currentPage} />
        ) : (
          <BlogArticlesGrid sortOrder={sortOrder} currentPage={currentPage} />
        )}
      </div>
      {hasMultiplePages ? (
        /* Only show the buttons if there is more than one page */
        <div className="flex flex-row justify-center pt-12 md:pt-18 lg:pt-24">
          <div>
            <Button
              variant="secondary"
              id="blog-goPrev"
              onClick={handleGoPrev}
              disabled={
                currentPage?.page === 0 || paginationStatus === Status.Pending
              }
              label="Previous"
            />
          </div>
          <div className="ml-3">
            <Button
              variant="secondary"
              id="blog-goNext"
              onClick={handleGoNext}
              disabled={
                currentPage?.hasNextPage === false ||
                paginationStatus === Status.Pending
              }
              label="Next"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

type BlogPageArticlesProps = {
  blog: Blog;
  articleTag: Maybe<BlogArticleTagGroup>;
  initialArticlesPage: Maybe<BlogArticlePagination>;
};

export const BlogPageArticles: FC<BlogPageArticlesProps> = ({
  blog,
  articleTag,
  initialArticlesPage,
}) => {
  const { state, goNext, goPrev } = useBlogArticlePagination(
    blog.slug.current,
    initialArticlesPage,
    articleTag,
  );
  const { currentPage } = state;
  return (
    <BlogPageArticlesInner
      paginationStatus={state.status}
      articleLayout={blog.articleLayout}
      currentPage={currentPage}
      goNext={goNext}
      goPrev={goPrev}
      sortOrder={blog.articleSortOrder}
    />
  );
};
