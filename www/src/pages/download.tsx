import React, { FC } from 'react';

import { GetStaticProps } from '@/types/next';
import { DownloadPage as DownloadPageType } from '@/types/sanity';
import { DownloadPageView } from '@/views/DownloadPageView';
import * as Sanity from '@/lib/sanity';
import { RevalidationTime } from '@/constants';

type DownloadPageProps = {
  downloadPage: DownloadPageType;
};

const DownloadPage: FC<DownloadPageProps> = ({ downloadPage }) => {
  return <DownloadPageView downloadPage={downloadPage} />;
};

export const getStaticProps: GetStaticProps<DownloadPageProps> = async () => {
  const [siteSettings, downloadPage] = await Promise.all([
    Sanity.siteSettings.get(),
    Sanity.downloadPage.get(),
  ]);
  if (!downloadPage) {
    return { notFound: true };
  }
  return {
    props: { downloadPage, siteSettings },
    revalidate: RevalidationTime.Medium,
  };
};

export default DownloadPage;
