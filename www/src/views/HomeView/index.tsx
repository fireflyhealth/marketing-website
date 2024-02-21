import React, { FC } from 'react';

import { Homepage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Subnav } from '@/components/Subnav';

type HomeViewProps = {
  homepage: Homepage;
};

export const HomeView: FC<HomeViewProps> = ({ homepage }) => {
  console.log(homepage);
  return (
    <div>
      <HeaderArea block={homepage.header} />
      <Subnav subnav={homepage.subnav} />
      <ContentArea blocks={homepage.content} />
    </div>
  );
};
