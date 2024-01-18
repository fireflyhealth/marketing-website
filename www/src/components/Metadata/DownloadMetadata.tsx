import React, { FC } from 'react';

import { DownloadPage, Metadata } from '@/types/sanity';
import { GenericMetadata } from './GenericMetadata';

type DownloadMetadataProps = {
  metadata?: Metadata;
  downloadPage: DownloadPage;
};

export const DownloadMetadata: FC<DownloadMetadataProps> = ({
  metadata,
  downloadPage,
}) => {
  // TODO: add sensible metadata fallbacks from page content
  return <GenericMetadata {...metadata} />;
};
