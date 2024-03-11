import React, { FC } from 'react';
import { GenericPage, SubPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Subnav } from '@/components/Subnav';
import getSubnavItems from '@/utils/getSubnavItems';

type PageViewProps = {
  page: GenericPage | SubPage;
};

export const PageView: FC<PageViewProps> = ({ page }) => {
  const subnavItems = getSubnavItems(page.content);

  return (
    <div>
      <HeaderArea block={page.header} />
      {subnavItems && <Subnav subnav={subnavItems} />}
      <ContentArea blocks={page.content} />
    </div>
  );
};
