import React, { FC } from 'react';

import { GenericPage, SubPage } from '@/types/sanity';
import { GenericMetadata } from './GenericMetadata';

type PageMetadataProps = {
  page: GenericPage | SubPage;
};

export const PageMetadata: FC<PageMetadataProps> = ({ page }) => {
  // TODO: add sensible metadata fallbacks from page content
  return (
    <GenericMetadata
      title={page.metadata?.title || page.title}
      {...page.metadata}
    />
  );
};
