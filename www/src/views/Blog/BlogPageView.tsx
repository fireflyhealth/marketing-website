import React, { FC } from 'react';
import { Blog } from '@/types/sanity';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { BlogPageFeaturedArticle } from './BlogPageFeaturedArticle';

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
    articleLayout,
  } = blog;
  return (
    <div>
      <HeaderArea block={blog.header} />
      {contentArea ? <ContentArea blocks={contentArea} /> : null}
      {featuredArticle ? (
        <div>
          <BlogPageFeaturedArticle article={featuredArticle} />
        </div>
      ) : null}
    </div>
  );
};
