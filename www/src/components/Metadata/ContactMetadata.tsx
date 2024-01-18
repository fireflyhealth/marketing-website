import React, { FC } from 'react';

import { ContactPage, Metadata } from '@/types/sanity';
import { GenericMetadata } from './GenericMetadata';

type ContactMetadataProps = {
  metadata?: Metadata;
  contactPage: ContactPage;
};

export const ContactMetadata: FC<ContactMetadataProps> = ({
  metadata,
  contactPage,
}) => {
  // TODO: add sensible metadata fallbacks from page content
  return <GenericMetadata {...metadata} />;
};
