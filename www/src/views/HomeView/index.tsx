import React, { FC } from 'react';

import { Homepage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Subnav } from '@/components/Subnav';
import getSubnavItems from '@/utils/getSubnavItems';

type HomeViewProps = {
  homepage: Homepage;
};

export const HomeView: FC<HomeViewProps> = ({ homepage }) => {
  const subnavItems = getSubnavItems(homepage.content);

  return (
    <div>
      <HeaderArea block={homepage.header} />
      {subnavItems && <Subnav subnav={subnavItems} />}
      <ContentArea blocks={homepage.content} />
    </div>
  );
};
