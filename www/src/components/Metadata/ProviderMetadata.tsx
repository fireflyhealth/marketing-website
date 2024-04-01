import React, { FC } from 'react';

import { Practitioner } from '@/types/sanity';
import { GenericMetadata } from './GenericMetadata';

type PageMetadataProps = {
  provider: Practitioner;
};

export const PageMetadata: FC<PageMetadataProps> = ({ provider }) => {
  // TODO: add sensible metadata fallbacks from provider content
  return (
    <GenericMetadata
      title={provider.metadata?.title || provider.name}
      {...provider.metadata}
    />
  );
};
