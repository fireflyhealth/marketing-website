import React, { FC } from 'react';

import { Homepage } from '@/types/sanity';

type HomeViewProps = {
  homepage: Homepage;
};

export const HomeView: FC<HomeViewProps> = ({ homepage }) => {
  return <div>Home</div>;
};
