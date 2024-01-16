import React, { FC } from 'react';

import { Homepage, Metadata } from '@/types/sanity';
import { GenericMetadata } from './GenericMetadata';

type HomeMetadataProps = {
  metadata?: Metadata;
  homepage: Homepage;
};

export const HomeMetadata: FC<HomeMetadataProps> = ({ metadata, homepage }) => {
  // TODO: add sensible metadata fallbacks from page content
  return <GenericMetadata {...metadata} />;
};
