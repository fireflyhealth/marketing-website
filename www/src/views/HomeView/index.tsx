import React, { FC } from 'react';

import { Homepage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';

type HomeViewProps = {
  homepage: Homepage;
};

export const HomeView: FC<HomeViewProps> = ({ homepage }) => {
  return (
    <div>
      <HeaderArea block={homepage.header} />
      <ContentArea blocks={homepage.content} />
    </div>
  );
};
