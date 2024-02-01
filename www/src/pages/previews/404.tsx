import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import * as Sanity from '@/lib/sanity';
import * as SanityTypes from '@/types/sanity';
import * as NextTypes from '@/types/next';

import NotFoundPage, { NotFoundPageProps } from '@/pages/404';

const NotFoundPagePreview: NextTypes.PageRoute<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ notFoundPage, siteSettings, previewToken }) => {
  const [livePage, setLivePage] = useState(notFoundPage);
  const [liveSettings, setLiveSettings] = useState(siteSettings);

  /*
  We subscribe to our queries here and listen to real-time updates.
  This means our preview will automatically rerender as new updates
  come in from Sanity. This allows us to render our page preview next
  to our Sanity Studio and content editors will preview changes in
  real-time. How fun!
  */
  useEffect(() => {
    const updatePage = (newLive404Page: SanityTypes.NotFoundPage) => {
      setLivePage(newLive404Page);
    };

    const settingsStream = Sanity.siteSettings.streamPreview(
      previewToken,
      setLiveSettings,
    );
    const pageStream = Sanity.notFoundPage.streamPreview(
      previewToken,
      updatePage,
    );

    return () => {
      settingsStream.unsubscribe();
      pageStream.unsubscribe();
    };
  }, [previewToken]);

  return <NotFoundPage notFoundPage={livePage} siteSettings={liveSettings} />;
};

export const getServerSideProps: GetServerSideProps<
  NotFoundPageProps & { previewToken: string }
> = async (context) => {
  // @ts-ignore
  const previewToken: string = context.query.sanityPreviewToken;
  if (!previewToken) return { notFound: true };
  const siteSettings = await Sanity.siteSettings.get();
  const notFoundPage = await Sanity.notFoundPage
    .fetchPreview(previewToken)
    .then((notFoundPage) => {
      /*
    When a content editor begins editing a published document
    for the first time, we'll switch from a published document ID
    to a draft document ID (in the format of draft.{id}). When this
    happens, our page reloads. On the first reload, the Sanity document
    is not quite ready to be retrieved from the API. In the case that
    Sanity's API returns null for the given page, we retry after 1s.
    Most of the time, the document will be available at this point.
    */

      if (notFoundPage === null)
        return new Promise<SanityTypes.NotFoundPage>((resolve) => {
          setTimeout(() => {
            Sanity.notFoundPage.fetchPreview(previewToken).then(resolve);
          }, 1000);
        });

      return notFoundPage;
    });

  const navigationOverrides = notFoundPage.navigationOverrides;

  return {
    props: {
      siteSettings,
      notFoundPage,
      navigationOverrides: navigationOverrides || null,
      previewToken,
    },
    notFound: !notFoundPage,
  };
};

export default NotFoundPagePreview;
