import React, { FC } from 'react';
import { FAQPage } from '@/types/sanity';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';

type FAQPageViewProps = {
  faqPage: FAQPage;
};

export const FAQPageView: FC<FAQPageViewProps> = ({ faqPage }) => {
  return (
    <div>
      <HeaderArea block={faqPage.header} />
    </div>
  );
};
