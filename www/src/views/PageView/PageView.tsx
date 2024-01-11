import React, { FC } from 'react';
import { GenericPage, SubPage } from '@/types/sanity';

type PageViewProps = {
  page: GenericPage | SubPage;
};

export const PageView: FC<PageViewProps> = ({ page }) => {
  return <div>{page.title}</div>;
};
