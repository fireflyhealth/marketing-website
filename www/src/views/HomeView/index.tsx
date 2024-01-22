import React, { FC } from 'react';

import { Homepage } from '@/types/sanity';
import { RichText } from '@/components/RichText';

type HomeViewProps = {
  homepage: Homepage;
};

export const HomeView: FC<HomeViewProps> = ({ homepage }) => {
  return (
    <div>
      Home
      <hr />
      {homepage.sampleSimpleRichText ? (
        <RichText content={homepage.sampleSimpleRichText} />
      ) : null}
    </div>
  );
};
