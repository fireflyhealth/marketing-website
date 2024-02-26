import React, { FC } from 'react';

import { Homepage, SubnavItem, ContentBlock } from '@/types/sanity';
import { ContentArea } from '@/components/contentBlocks/ContentArea';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Subnav } from '@/components/Subnav';

type HomeViewProps = {
  homepage: Homepage;
};

export const HomeView: FC<HomeViewProps> = ({ homepage }) => {
  const subnavItems: SubnavItem[] = homepage.content.reduce(
    (acc: SubnavItem[], cur: ContentBlock) => {
      if (!!cur.subnav) {
        return acc.concat([cur.subnav]);
      }
      return acc;
    },
    [],
  );

  return (
    <div>
      <HeaderArea block={homepage.header} />
      {homepage.subnav && <Subnav subnav={subnavItems} />}
      <ContentArea blocks={homepage.content} />
    </div>
  );
};
