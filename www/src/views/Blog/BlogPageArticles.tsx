import React, { FC, useRef } from 'react';
import cn from 'classnames';
import { BlogArticleLayout, BlogArticlePagination } from '@/types/sanity';
import { Status } from '@/constants';
import { Button } from '@/atoms/Button';
import { BlogArticlesList } from './BlogArticlesList';
import { BlogArticlesGrid } from './BlogArticlesGrid';

type BlogPageArticlesProps = {
  currentPage: BlogArticlePagination;
  goNext: () => Promise<void>;
  goPrev: () => Promise<void>;
  articleLayout: BlogArticleLayout;
  paginationStatus: Status;
};

export const BlogPageArticles: FC<BlogPageArticlesProps> = ({
  currentPage,
  goNext,
  goPrev,
  articleLayout,
  paginationStatus,
}) => {
  const blogArticlesRef = useRef<HTMLDivElement>(null);
  const scrollToArticlesTop = () => {
    if (!blogArticlesRef.current) return;
    const articleTop = blogArticlesRef.current.offsetTop - 20;
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

  const hasMultiplePages =
    /* If we are on the first page, check to see if there is a
     * second one. */
    currentPage.page === 0
      ? currentPage.hasNextPage
      : /* Otherwise, we are on a different page, so there are
         * certainly multiple pages. */
        true;

  return (
    <>
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
          <BlogArticlesGrid currentPage={currentPage} />
        )}
      </div>
      {hasMultiplePages ? (
        /* Only show the buttons if there is more than one page */
        <div className="flex flex-row justify-center py-12 md:py-18 lg:py-24">
          <div>
            <Button
              variant="secondary"
              id="blog-goPrev"
              onClick={handleGoPrev}
              disabled={
                currentPage.page === 0 || paginationStatus === Status.Pending
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
                currentPage.hasNextPage === false ||
                paginationStatus === Status.Pending
              }
              label="Next"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
