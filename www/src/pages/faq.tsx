import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { PageProps } from '@/types/next';
import { FAQPage as FAQPageType } from '@/types/sanity';
import { FAQPageView } from '@/views/FAQPageView';
import * as Sanity from '@/lib/sanity';
import { FAQMetadata } from '@/components/Metadata/FAQMetadata';

export type FAQPageProps = PageProps & {
  faqPage: FAQPageType;
};

const FAQPage: FC<FAQPageProps> = ({ faqPage }) => {
  return (
    <>
      <FAQMetadata faqPage={faqPage} />
      <FAQPageView faqPage={faqPage} />
    </>
  );
};

export const getStaticProps: GetStaticProps<FAQPageProps> = async () => {
  const [siteSettings, faqPage] = await Promise.all([
    Sanity.siteSettings.get(),
    Sanity.faqPage.get(),
  ]);

  const navigationOverrides = faqPage?.navigationOverrides;

  if (!faqPage) {
    return { notFound: true };
  }
  return {
    props: {
      faqPage,
      siteSettings,
      navigationOverrides: navigationOverrides || null,
    },
  };
};

export default FAQPage;
