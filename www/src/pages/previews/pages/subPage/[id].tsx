import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import * as Sanity from '@/lib/sanity';
import * as SanityTypes from '@/types/sanity';
import * as NextTypes from '@/types/next';

import Page, { PageProps } from '@/pages/[pageSlug]/[subpageSlug]';

const GenericPagePreview: NextTypes.PageRoute<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ subPage, siteSettings, previewToken, id }) => {
  const [livePage, setLivePage] = useState(subPage);
  const [liveSettings, setLiveSettings] = useState(siteSettings);

  /*
  We subscribe to our queries here and listen to real-time updates.
  This means our preview will automatically rerender as new updates
  come in from Sanity. This allows us to render our page preview next
  to our Sanity Studio and content editors will preview changes in
  real-time. How fun!
  */
  useEffect(() => {
    const updatePage = (newLivePage: SanityTypes.SubPage) => {
      setLivePage(newLivePage);
    };

    const settingsStream = Sanity.siteSettings.streamPreview(
      previewToken,
      setLiveSettings,
    );
    const pageStream = Sanity.subPage.streamPreview(
      id,
      previewToken,
      updatePage,
    );

    return () => {
      settingsStream.unsubscribe();
      pageStream.unsubscribe();
    };
  }, [id, previewToken]);

  return <Page subPage={livePage} siteSettings={liveSettings} />;
};

export const getServerSideProps: GetServerSideProps<
  PageProps & { id: string; previewToken: string }
> = async (context) => {
  // @ts-ignore
  const id: string = context.params.id;
  // @ts-ignore
  const previewToken: string = context.query.sanityPreviewToken;
  if (!id || !previewToken) return { notFound: true };

  const siteSettings = await Sanity.siteSettings.get();
  const subPage = await Sanity.subPage
    .findPreview(id, previewToken)
    .then((subPage) => {
      /*
    When a content editor begins editing a published document
    for the first time, we'll switch from a published document ID
    to a draft document ID (in the format of draft.{id}). When this
    happens, our page reloads. On the first reload, the Sanity document
    is not quite ready to be retrieved from the API. In the case that
    Sanity's API returns null for the given page, we retry after 1s.
    Most of the time, the document will be available at this point.
    */
      if (subPage === null)
        return new Promise<SanityTypes.SubPage>((resolve) => {
          setTimeout(() => {
            Sanity.subPage.findPreview(id, previewToken).then(resolve);
          }, 1000);
        });

      return subPage;
    });

  const navigationOverrides = subPage.navigationOverrides;

  return {
    props: {
      siteSettings,
      subPage: subPage,
      navigationOverrides: navigationOverrides || null,
      previewToken,
      id,
    },
    notFound: !subPage,
  };
};

export default GenericPagePreview;
