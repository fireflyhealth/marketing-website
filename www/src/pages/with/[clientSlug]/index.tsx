import React, { FC } from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { PageProps } from '@/types/next';
import { RevalidationTime } from '@/constants';

import { ClientPage as ClientPageType, SiteSettings } from '@/types/sanity';
import { ClientPageView } from '@/views/ClientPageView';
import { JPMCVIew } from '@/views/JPMCView';
import * as Sanity from '@/lib/sanity';
import { ClientMetadata } from '@/components/Metadata/ClientMetadata';
import { QueryConfig } from '@/lib/sanity';

export type ClientPageProps = PageProps & {
  clientPage: ClientPageType;
};

type ClientPageParams = {
  clientSlug: string;
};

const ClientPage: FC<ClientPageProps> = ({ siteSettings, clientPage }) => {
  const {
    showOriginalJPMCPage,
    jpmcHeroImage,
    jpmcDocument,
    jpmcUserFlowVideo,
  } = siteSettings;
  const router = useRouter();
  const isJPMCPage = router.asPath.startsWith('/with/jpmc');
  return (
    <>
      {showOriginalJPMCPage && isJPMCPage ? (
        <JPMCVIew
          jpmcUserFlowVideo={jpmcUserFlowVideo}
          heroImage={jpmcHeroImage}
          document={jpmcDocument}
        />
      ) : (
        <>
          <ClientMetadata clientPage={clientPage} />
          <ClientPageView clientPage={clientPage} />
        </>
      )}
    </>
  );
};

export const createGetStaticProps =
  (config?: QueryConfig): GetStaticProps<ClientPageProps, ClientPageParams> =>
  async ({ params }) => {
    const clientSlug = params?.clientSlug;
    if (!clientSlug || typeof clientSlug !== 'string') {
      /* This will never happen, but keeps typescript happy */
      throw new Error('clientSlug param is not a string');
    }

    const [siteSettings, clientPage] = await Promise.all([
      Sanity.siteSettings.get(),
      Sanity.clientPage.get(clientSlug, config),
    ]);

    const navigationOverrides = clientPage?.navigationOverrides;

    if (!clientPage) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        siteSettings,
        clientPage,
        navigationOverrides: navigationOverrides || null,
      },
      revalidate: RevalidationTime.Medium,
    };
  };

export const getStaticProps = createGetStaticProps();

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
