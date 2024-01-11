import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { DownloadPage as DownloadPageType } from '@/types/sanity';
import { DownloadPageView } from '@/views/DownloadPageView';
import * as Sanity from '@/lib/sanity';

type DownloadPageProps = {
  downloadPage: DownloadPageType;
};

const DownloadPage: FC<DownloadPageProps> = ({ downloadPage }) => {
  return <DownloadPageView downloadPage={downloadPage} />;
};

export const getStaticProps: GetStaticProps<DownloadPageProps> = async () => {
  const downloadPage = await Sanity.downloadPage.get();
  if (!downloadPage) {
    return { notFound: true };
  }
  return {
    props: { downloadPage },
  };
};

export default DownloadPage;
