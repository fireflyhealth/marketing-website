import React, { FC } from 'react';

import { Homepage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { getSubnavItems } from '@/utils/getSubnavItems';

export type HomeViewProps = {
  homepage: Homepage;
};

export const HomeView: FC<HomeViewProps> = ({ homepage }) => {
  const subnavItems = getSubnavItems(homepage.content);

  return (
    <div>
      <HeaderArea block={homepage.header} />
      <ContentArea blocks={homepage.content} subNav={subnavItems} />
    </div>
  );
};
