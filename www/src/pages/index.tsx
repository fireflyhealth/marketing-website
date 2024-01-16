import React, { FC } from 'react';

import { GetStaticProps } from '@/types/next';
import { Homepage } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { HomeView } from '@/views/HomeView';
import { RevalidationTime } from '@/constants';

type HomeProps = {
  homepage: Homepage;
};

const Home: FC<HomeProps> = ({ homepage }) => {
  return <HomeView homepage={homepage} />;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [siteSettings, homepage] = await Promise.all([
    Sanity.siteSettings.get(),
    Sanity.homepage.get(),
  ]);
  return {
    props: { siteSettings, homepage },
    revalidate: RevalidationTime.Often,
  };
};

export default Home;
