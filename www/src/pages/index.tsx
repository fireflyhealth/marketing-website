import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { PageProps } from '@/types/next';
import { Homepage } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { HomeView } from '@/views/HomeView';
import { RevalidationTime } from '@/constants';
import { HomeMetadata } from '@/components/Metadata/HomeMetadata';

type HomeProps = PageProps<{
  homepage: Homepage;
}>;

const Home: FC<HomeProps> = ({ homepage }) => {
  return (
    <>
      <HomeMetadata homepage={homepage} />
      <HomeView homepage={homepage} />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [siteSettings, homepage] = await Promise.all([
    Sanity.siteSettings.get(),
    Sanity.homepage.get(),
  ]);

  const navigationOverrides = homepage?.navigationOverrides;

  return {
    props: {
      siteSettings,
      homepage,
      navigationOverrides: navigationOverrides || null,
    },
    revalidate: RevalidationTime.Often,
  };
};

export default Home;
