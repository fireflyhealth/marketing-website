import React, { FC } from 'react';
import { ClientPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';

type ClientPageViewProps = {
  clientPage: ClientPage;
};

export const ClientPageView: FC<ClientPageViewProps> = ({ clientPage }) => {
  return (
    <div>
      <HeaderArea blocks={clientPage.header} />
      <ContentArea blocks={clientPage.content} />
    </div>
  );
};
