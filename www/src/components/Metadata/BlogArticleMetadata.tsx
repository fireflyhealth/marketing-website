import React, { FC } from 'react';

import { BlogArticle, Metadata } from '@/types/sanity';
import { GenericMetadata } from './GenericMetadata';

type BlogArticleMetadataProps = {
  metadata?: Metadata;
  article: BlogArticle;
};

export const BlogArticleMetadata: FC<BlogArticleMetadataProps> = ({
  metadata,
  article,
}) => {
  // TODO: add sensible metadata fallbacks from page content
  // See: https://ogp.me/#type_article
  return (
    <GenericMetadata {...metadata}>
      {/*
        article - Namespace URI: https://ogp.me/ns/article#

        article:published_time - datetime - When the article was first published.
        article:modified_time - datetime - When the article was last changed.
        article:expiration_time - datetime - When the article is out of date after.
        article:author - profile array - Writers of the article.
        article:section - string - A high-level section name. E.g. Technology
        article:tag - string array - Tag words associated with this article.
      */}
    </GenericMetadata>
  );
};
