import React, { FC } from 'react';
import { DownloadPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';

export type DownloadPageViewProps = {
  downloadPage: DownloadPage;
};

export const DownloadPageView: FC<DownloadPageViewProps> = ({
  downloadPage,
}) => {
  return (
    <div>
      <HeaderArea block={downloadPage.header} />
      <ContentArea blocks={downloadPage.content} renderSubnav={false} />
    </div>
  );
};
