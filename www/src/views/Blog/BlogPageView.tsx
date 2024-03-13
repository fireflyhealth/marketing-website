import React, { FC } from 'react';
import { Blog, BlogArticlePagination } from '@/types/sanity';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { useBlogArticlePagination } from '@/hooks/useBlogArticlePagination';
import { BlogPageFeaturedArticle } from './BlogPageFeaturedArticle';
import { BlogPageArticles } from './BlogPageArticles';

type BlogPageViewProps = {
  blog: Blog;
  initialArticlesPage: BlogArticlePagination;
};

export const BlogPageView: FC<BlogPageViewProps> = ({
  blog,
  initialArticlesPage,
}) => {
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
  return (
    <div>
      <HeaderArea block={header} />
      {contentArea ? <ContentArea blocks={contentArea} /> : null}
      {featuredArticle ? (
        <BlogPageFeaturedArticle article={featuredArticle} />
      ) : null}
      <BlogPageArticles
        paginationStatus={state.status}
        articleLayout={articleLayout}
        currentPage={currentPage}
        goNext={goNext}
        goPrev={goPrev}
      />
    </div>
  );
};
