import React, { FC } from 'react';

import { GetStaticProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { NotFoundPage as NotFoundPageType } from '@/types/sanity';
import { NotFoundPageView } from '@/views/NotFoundView';
import * as Sanity from '@/lib/sanity';
import { GenericMetadata } from '@/components/Metadata/GenericMetadata';

type NotFoundPageProps = {
  notFoundPage: NotFoundPageType;
};

const NotFoundPage: FC<NotFoundPageProps> = ({ notFoundPage }) => {
  return (
    <>
      <GenericMetadata noIndex={true} />
      <NotFoundPageView notFoundPage={notFoundPage} />
    </>
  );
};

export const getStaticProps: GetStaticProps<NotFoundPageProps> = async () => {
  const [siteSettings, notFoundPage] = await Promise.all([
    Sanity.siteSettings.get(),
    Sanity.notFoundPage.get(),
  ]);
  if (!notFoundPage) {
    throw new Error('Could not fetch not found page from Sanity');
  }
  if (!siteSettings) {
    throw new Error('Could not fetch site settings from Sanity');
  }

  return {
    props: { notFoundPage, siteSettings },
    revalidate: RevalidationTime.Medium,
  };
};

export default NotFoundPage;
