import React, { FC } from 'react';

import { ClientPage, Metadata } from '@/types/sanity';
import { GenericMetadata } from './GenericMetadata';

type ClientMetadataProps = {
  metadata?: Metadata;
};

export const ClientMetadata: FC<ClientMetadataProps> = ({ metadata }) => {
  // Client page should not show up in search results.
  // So we set noIndex to true.
  return <GenericMetadata {...metadata} noIndex={true} />;
};
