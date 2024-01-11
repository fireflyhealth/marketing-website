import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { PressKitPage as PressKitPageType } from '@/types/sanity';
import { PressKitPageView } from '@/views/PressKitPageView';
import * as Sanity from '@/lib/sanity';

type PressKitPageProps = {
  pressKitPage: PressKitPageType;
};

const PressKitPage: FC<PressKitPageProps> = ({ pressKitPage }) => {
  return <PressKitPageView pressKitPage={pressKitPage} />;
};

export const getStaticProps: GetStaticProps<PressKitPageProps> = async () => {
  const pressKitPage = await Sanity.pressKitPage.get();
  if (!pressKitPage) {
    return { notFound: true };
  }
  return {
    props: { pressKitPage },
  };
};

export default PressKitPage;
