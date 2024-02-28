import React, { FC } from 'react';
import { FAQPage } from '@/types/sanity';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Tabs } from '@/components/Tabs';
import { FAQTab } from './FAQTab';

type FAQPageViewProps = {
  faqPage: FAQPage;
};

export const FAQPageView: FC<FAQPageViewProps> = ({ faqPage }) => {
  return (
    <div className="p-4 md:p-12">
      <HeaderArea block={faqPage.header} />
      <h1 className="font-trust font-size-3">{faqPage.title}</h1>
      <div>
        <Tabs
          tabs={faqPage.faqTabs.map((faqTab) => ({
            _key: faqTab._key,
            label: faqTab.title,
            children: <FAQTab faqTab={faqTab} />,
          }))}
        />
      </div>
    </div>
  );
};
