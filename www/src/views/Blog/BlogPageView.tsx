import React, { FC, useRef } from 'react';
import cn from 'classnames';
import { Blog, BlogArticlePagination } from '@/types/sanity';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { useBlogArticlePagination } from '@/hooks/useBlogArticlePagination';
import { Status } from '@/constants';
import { Button } from '@/atoms/Button';
import { BlogPageFeaturedArticle } from './BlogPageFeaturedArticle';
import { BlogArticlesList } from './BlogArticlesList';
import { BlogArticlesGrid } from './BlogArticlesGrid';

type BlogPageViewProps = {
  blog: Blog;
  initialArticlesPage: BlogArticlePagination;
};

export const BlogPageView: FC<BlogPageViewProps> = ({
  blog,
  initialArticlesPage,
}) => {
  const blogArticlesRef = useRef<HTMLDivElement>(null);
  const {
    header,
    featuredArticle,
    contentArea,
    blogArticleTagGroups,
    allArticlesLabel,
    articleLayout,
  } = blog;
  const { state, goNext, goPrev } = useBlogArticlePagination(
    blog.slug.current,
    initialArticlesPage,
  );
  const { currentPage } = state;
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
    await goPrev();
    scrollToArticlesTop();
  };
  const handleGoPrev = async () => {
    await goPrev();
    scrollToArticlesTop();
  };
  return (
    <div>
      <HeaderArea block={header} />
      {contentArea ? <ContentArea blocks={contentArea} /> : null}
      {featuredArticle ? (
        <BlogPageFeaturedArticle article={featuredArticle} />
      ) : null}
      <div
        ref={blogArticlesRef}
        className={cn(
          state.status === Status.Pending
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
      <div className="flex flex-row justify-center py-12 md:py-18 lg:py-24">
        <div>
          <Button
            variant="secondary"
            id="blog-goPrev"
            onClick={handleGoPrev}
            disabled={currentPage.page === 0 || state.status === Status.Pending}
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
              state.status === Status.Pending
            }
            label="Next"
          />
        </div>
      </div>
    </div>
  );
};
