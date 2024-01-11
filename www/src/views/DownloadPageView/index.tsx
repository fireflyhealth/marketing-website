import React, { FC } from 'react';
import { DownloadPage } from '@/types/sanity';

type DownloadPageViewProps = {
  downloadPage: DownloadPage;
};

export const DownloadPageView: FC<DownloadPageViewProps> = ({
  downloadPage,
}) => {
  return <div>{downloadPage.title}</div>;
};
