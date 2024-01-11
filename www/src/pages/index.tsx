import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { Homepage } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { HomeView } from '../views/HomeView/HomeView';

type HomeProps = {
  homepage: Homepage;
};

const Home: FC<HomeProps> = ({ homepage }) => {
  return <HomeView homepage={homepage} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const homepage = await Sanity.homepage.get();
  return {
    props: { homepage },
  };
};

export default Home;
