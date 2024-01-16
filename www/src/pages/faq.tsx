import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { FAQPage as FAQPageType } from '@/types/sanity';
import { FAQPageView } from '@/views/FAQPageView';
import * as Sanity from '@/lib/sanity';

type FAQPageProps = {
  faqPage: FAQPageType;
};

const FAQPage: FC<FAQPageProps> = ({ faqPage }) => {
  return <FAQPageView faqPage={faqPage} />;
};

export const getStaticProps: GetStaticProps<FAQPageProps> = async () => {
  const faqPage = await Sanity.faqPage.get();
  if (!faqPage) {
    return { notFound: true };
  }
  return {
    props: { faqPage },
  };
};

export default FAQPage;
