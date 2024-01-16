import React, { FC } from 'react';

import { Blog, Metadata } from '@/types/sanity';
import { GenericMetadata } from './GenericMetadata';

type BlogMetadataProps = {
  metadata?: Metadata;
  blog: Blog;
};

export const BlogMetadata: FC<BlogMetadataProps> = ({ metadata, blog }) => {
  // TODO: add sensible metadata fallbacks from page content
  return <GenericMetadata {...metadata} />;
};
