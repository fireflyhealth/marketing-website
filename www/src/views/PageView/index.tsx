import React, { FC } from 'react';
import { GenericPage, SubPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Subnav } from '@/components/Subnav';

import { SubnavItem, ContentBlock } from '@/types/sanity';

type PageViewProps = {
  page: GenericPage | SubPage;
};

export const PageView: FC<PageViewProps> = ({ page }) => {
  const subnavItems: SubnavItem[] = page.content?.reduce(
    (acc: SubnavItem[], cur: ContentBlock) => {
      if (!!cur.subnav) {
        return acc.concat([cur.subnav]);
      }
      return acc;
    },
    [],
  );

  return (
    <div>
      <HeaderArea block={page.header} />
      {page.subnav && <Subnav subnav={subnavItems} />}
      <ContentArea blocks={page.content} />
    </div>
  );
};
