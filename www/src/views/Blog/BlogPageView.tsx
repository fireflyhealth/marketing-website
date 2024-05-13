import React, { FC } from 'react';
import cn from 'classnames';
import { Blog, BlogArticlePagination } from '@/types/sanity';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { Tabs } from '@/components/Tabs';
import { BlogPageFeaturedArticle } from './BlogPageFeaturedArticle';
import { BlogPageArticles } from './BlogPageArticles';
import { BlogPageArticlesWrapper } from './styles';

export type BlogPageViewProps = {
  blog: Blog;
  initialArticlesPage: BlogArticlePagination;
};

export const BlogPageView: FC<BlogPageViewProps> = ({
  blog,
  initialArticlesPage,
}) => {
  const { header, featuredArticle, contentArea } = blog;
  const blogArticleTagGroups = blog.blogArticleTagGroups || [];
  return (
    <div>
      <HeaderArea block={header} />
      {contentArea ? (
        <ContentArea blocks={contentArea} renderSubnav={false} />
      ) : null}
      {featuredArticle ? (
        <BlogPageFeaturedArticle article={featuredArticle} />
      ) : null}
      <div className={cn(BlogPageArticlesWrapper)}>
        <Tabs
          tabs={[
            /* The first tab is "all articles" */
            {
              _key: 'all',
              label: blog.allArticlesLabel,
              children: (
                <BlogPageArticles
                  blog={blog}
                  articleTag={null}
                  /* Provide it with the initial page provided by
                   * getStaticProps */
                  initialArticlesPage={initialArticlesPage}
                />
              ),
            },
            ...blogArticleTagGroups.map((tagGroup) => ({
              _key: tagGroup._key,
              label: tagGroup.tag.title,
              children: (
                <BlogPageArticles
                  blog={blog}
                  articleTag={tagGroup}
                  initialArticlesPage={null}
                />
              ),
            })),
          ]}
        />
      </div>
    </div>
  );
};
