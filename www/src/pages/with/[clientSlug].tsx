import React, { FC } from 'react';

import { GetStaticPaths } from 'next';
import { GetStaticProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { ClientPage as ClientPageType } from '@/types/sanity';
import { ClientPageView } from '@/views/ClientPageView';
import * as Sanity from '@/lib/sanity';

type ClientPageProps = {
  clientPage: ClientPageType;
};

type ClientPageParams = {
  clientSlug: string;
};

const ClientPage: FC<ClientPageProps> = ({ clientPage }) => {
  return <ClientPageView clientPage={clientPage} />;
};

export const getStaticProps: GetStaticProps<
  ClientPageProps,
  ClientPageParams
> = async ({ params }) => {
  const clientSlug = params?.clientSlug;
  if (!clientSlug || typeof clientSlug !== 'string') {
    /* This will never happen, but keeps typescript happy */
    throw new Error('clientSlug param is not a string');
  }

  const [siteSettings, clientPage] = await Promise.all([
    Sanity.siteSettings.get(),
    Sanity.clientPage.get(clientSlug),
  ]);
  if (!clientPage) {
    return {
      notFound: true,
    };
  }

  return {
    props: { siteSettings, clientPage },
    revalidate: RevalidationTime.Medium,
  };
};

export const getStaticPaths: GetStaticPaths<ClientPageParams> = async () => {
  const clientPages = await Sanity.clientPage.getSlugInfo();
  const paths = clientPages.map((clientPage) => ({
    params: { clientSlug: clientPage.slug.current },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export default ClientPage;
