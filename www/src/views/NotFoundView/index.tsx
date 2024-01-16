import React, { FC } from 'react';
import { NotFoundPage } from '@/types/sanity';

type NotFoundPageViewProps = {
  notFoundPage: NotFoundPage;
};

export const NotFoundPageView: FC<NotFoundPageViewProps> = ({
  notFoundPage,
}) => {
  return <div>{notFoundPage.title}</div>;
};
