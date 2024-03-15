import React, { FC } from 'react';
import { ClientPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Subnav } from '@/components/Subnav';
import { getSubnavItems } from '@/utils/getSubnavItems';

type ClientPageViewProps = {
  clientPage: ClientPage;
};

export const ClientPageView: FC<ClientPageViewProps> = ({ clientPage }) => {
  const subnavItems = getSubnavItems(clientPage.content);

  return (
    <div>
      <HeaderArea block={clientPage.header} />
      <Subnav subnav={subnavItems} />
      <ContentArea blocks={clientPage.content} />
    </div>
  );
};
