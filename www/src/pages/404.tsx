import React, { FC } from 'react';
import { GetStaticProps } from 'next';

import { NotFoundPage as NotFoundPageType } from '@/types/sanity';
import { NotFoundPageView } from '@/views/NotFoundView';
import * as Sanity from '@/lib/sanity';

type NotFoundPageProps = {
  notFoundPage: NotFoundPageType;
};

const NotFoundPage: FC<NotFoundPageProps> = ({ notFoundPage }) => {
  return <NotFoundPageView notFoundPage={notFoundPage} />;
};

export const getStaticProps: GetStaticProps<NotFoundPageProps> = async () => {
  const notFoundPage = await Sanity.notFoundPage.get();
  if (!notFoundPage) {
    return { notFound: true };
  }
  return {
    props: { notFoundPage },
  };
};

export default NotFoundPage;
