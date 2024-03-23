import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { PageProps } from '@/types/next';
import { DownloadPage as DownloadPageType } from '@/types/sanity';
import { DownloadPageView } from '@/views/DownloadPageView';
import * as Sanity from '@/lib/sanity';
import { RevalidationTime } from '@/constants';
import { DownloadMetadata } from '@/components/Metadata/DownloadMetadata';
import { QueryConfig } from '@/lib/sanity';

export type DownloadPageProps = PageProps & {
  downloadPage: DownloadPageType;
};

const DownloadPage: FC<DownloadPageProps> = ({ downloadPage }) => {
  return (
    <>
      <DownloadMetadata downloadPage={downloadPage} />
      <DownloadPageView downloadPage={downloadPage} />
    </>
  );
};

export const createGetStaticProps =
  (config?: QueryConfig): GetStaticProps<DownloadPageProps> =>
  async () => {
    const [siteSettings, downloadPage] = await Promise.all([
      Sanity.siteSettings.get(),
      Sanity.downloadPage.get(config),
    ]);

    const navigationOverrides = downloadPage?.navigationOverrides;

    if (!downloadPage) {
      return { notFound: true };
    }
    return {
      props: {
        downloadPage,
        siteSettings,
        navigationOverrides: navigationOverrides || null,
      },
      revalidate: RevalidationTime.Medium,
    };
  };

export const getStaticProps = createGetStaticProps();

export default DownloadPage;
