import React, { FC } from 'react';

import { ClientPage, Metadata } from '@/types/sanity';
import { GenericMetadata } from './GenericMetadata';

type ClientMetadataProps = {
  metadata?: Metadata;
  clientPage: ClientPage;
};

export const ClientMetadata: FC<ClientMetadataProps> = ({
  metadata,
  clientPage,
}) => {
  // TODO: add sensible metadata fallbacks from page content
  return <GenericMetadata {...metadata} />;
};
