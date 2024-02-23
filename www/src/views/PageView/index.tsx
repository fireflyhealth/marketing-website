import React, { FC } from 'react';
import { GenericPage, SubPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Subnav } from '@/components/Subnav';

type PageViewProps = {
  page: GenericPage | SubPage;
};

export const PageView: FC<PageViewProps> = ({ page }) => {
  return (
    <div>
      <HeaderArea block={page.header} />
      <Subnav subnav={page.subnav} />
      <ContentArea blocks={page.content} />
    </div>
  );
};
