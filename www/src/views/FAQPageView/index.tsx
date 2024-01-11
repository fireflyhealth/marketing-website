import React, { FC } from 'react';
import { FAQPage } from '@/types/sanity';

type FAQPageViewProps = {
  faqPage: FAQPage;
};

export const FAQPageView: FC<FAQPageViewProps> = ({ faqPage }) => {
  return <div>{faqPage.title}</div>;
};
