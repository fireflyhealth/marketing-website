import React, { FC } from 'react';
import { ClientPage } from '@/types/sanity';

type ClientPageViewProps = {
  clientPage: ClientPage;
};

export const ClientPageView: FC<ClientPageViewProps> = ({ clientPage }) => {
  return <div>{clientPage.clientName}</div>;
};
