import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { PageProps } from '@/types/next';
import { Homepage } from '@/types/sanity';
import * as Sanity from '@/lib/sanity';
import { HomeView } from '@/views/HomeView';
import { RevalidationTime } from '@/constants';
import { HomeMetadata } from '@/components/Metadata/HomeMetadata';
import { QueryConfig } from '@/lib/sanity';

export type HomeProps = PageProps & {
  homepage: Homepage;
};

const Home: FC<HomeProps> = ({ homepage }) => {
  return (
    <>
      <HomeMetadata homepage={homepage} />
      <HomeView homepage={homepage} />
    </>
  );
};

export const createGetStaticProps =
  (config?: QueryConfig): GetStaticProps<HomeProps> =>
  async () => {
    const [siteSettings, homepage] = await Promise.all([
      Sanity.siteSettings.get(),
      Sanity.homepage.get(config),
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

export const getStaticProps = createGetStaticProps();

export default Home;
