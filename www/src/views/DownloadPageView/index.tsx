import React, { FC } from 'react';
import { DownloadPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';

type DownloadPageViewProps = {
  downloadPage: DownloadPage;
};

export const DownloadPageView: FC<DownloadPageViewProps> = ({
  downloadPage,
}) => {
  return (
    <div>
      <HeaderArea blocks={downloadPage.header} />
      <ContentArea blocks={downloadPage.content} />
    </div>
  );
};
