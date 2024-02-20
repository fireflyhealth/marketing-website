import React, { FC } from 'react';

import { Homepage } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';

type HomeViewProps = {
  homepage: Homepage;
};

export const HomeView: FC<HomeViewProps> = ({ homepage }) => {
  return (
    <div>
      <ContentArea blocks={homepage.content} />
    </div>
  );
};
