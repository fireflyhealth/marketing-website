import React, { FC } from 'react';
import { ClientPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { getSubnavItems } from '@/utils/getSubnavItems';

export type ClientPageViewProps = {
  clientPage: ClientPage;
};

export const ClientPageView: FC<ClientPageViewProps> = ({ clientPage }) => {
  const subnavItems = getSubnavItems(clientPage.content);

  return (
    <div>
      <HeaderArea block={clientPage.header} />
      <ContentArea blocks={clientPage.content} subNav={subnavItems} />
    </div>
  );
};
