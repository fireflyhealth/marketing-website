import React, { FC } from 'react';

import { FAQPage, Metadata } from '@/types/sanity';
import { GenericMetadata } from './GenericMetadata';

type FAQMetadataProps = {
  metadata?: Metadata;
  faqPage: FAQPage;
};

export const FAQMetadata: FC<FAQMetadataProps> = ({ metadata, faqPage }) => {
  // TODO: add sensible metadata fallbacks from page content
  return <GenericMetadata {...metadata} />;
};
