import React, { FC } from 'react';
import { ClientPage, SubnavItem, ContentBlock } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Subnav } from '@/components/Subnav';

type ClientPageViewProps = {
  clientPage: ClientPage;
};

export const ClientPageView: FC<ClientPageViewProps> = ({ clientPage }) => {
  const subnavItems: SubnavItem[] = clientPage.content.reduce(
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
      <HeaderArea block={clientPage.header} />
      {clientPage.subnav && <Subnav subnav={subnavItems} />}
      <ContentArea blocks={clientPage.content} />
    </div>
  );
};
