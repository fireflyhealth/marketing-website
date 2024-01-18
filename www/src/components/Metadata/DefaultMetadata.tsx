import React, { FC } from 'react';

import { Metadata } from '@/types/sanity';
import { config } from '@/config';
import { GenericMetadata } from './GenericMetadata';

type DefaultMetadataProps = {
  metadata: Metadata;
};

export const DefaultMetadata: FC<DefaultMetadataProps> = ({ metadata }) => {
  return (
    <GenericMetadata
      title={metadata.title || config.metadata.defaultTitle}
      {...metadata}
    />
  );
};
