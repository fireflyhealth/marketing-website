import React, { FC } from 'react';
import { Blog } from '@/types/sanity';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { BlogPageFeaturedArticle } from './BlogPageFeaturedArticle';
import { BlogArticlesList } from './BlogArticlesList';
import { BlogArticlesGrid } from './BlogArticlesGrid';

type BlogPageViewProps = {
  blog: Blog;
};

export const BlogPageView: FC<BlogPageViewProps> = ({ blog }) => {
  const {
    header,
    articles,
    featuredArticle,
    contentArea,
    blogArticleTagGroups,
    allArticlesLabel,
    articleLayout,
  } = blog;
  return (
    <div>
      <HeaderArea block={header} />
      {contentArea ? <ContentArea blocks={contentArea} /> : null}
      {featuredArticle ? (
        <div>
          <BlogPageFeaturedArticle article={featuredArticle} />
        </div>
      ) : null}
      {articleLayout === 'list' ? (
        <BlogArticlesList articles={articles} />
      ) : (
        <BlogArticlesGrid articles={articles} />
      )}
    </div>
  );
};
