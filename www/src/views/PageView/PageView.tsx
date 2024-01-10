import React, { FC } from 'react';
import { GenericPage } from '@/types/sanity';

type PageViewProps = {
  page: GenericPage;
};

export const PageView: FC<PageViewProps> = ({ page }) => {
  return <div>{page.title}</div>;
};
