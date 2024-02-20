import React, { FC } from 'react';
import { NotFoundPage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';

type NotFoundPageViewProps = {
  notFoundPage: NotFoundPage;
};

export const NotFoundPageView: FC<NotFoundPageViewProps> = ({
  notFoundPage,
}) => {
  return (
    <div>
      <HeaderArea blocks={notFoundPage.header} />
      <ContentArea blocks={notFoundPage.content} />
    </div>
  );
};
