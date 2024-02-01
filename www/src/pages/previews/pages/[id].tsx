import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import * as Sanity from '@/lib/sanity';
import * as SanityTypes from '@/types/sanity';
import * as NextTypes from '@/types/next';

import Page, { PageProps } from '@/pages/[pageSlug]';

const GenericPagePreview: NextTypes.PageRoute<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ page, siteSettings, previewToken, id }) => {
  const [livePage, setLivePage] = useState(page);
  const [liveSettings, setLiveSettings] = useState(siteSettings);

  /*
  We subscribe to our queries here and listen to real-time updates.
  This means our preview will automatically rerender as new updates
  come in from Sanity. This allows us to render our page preview next
  to our Sanity Studio and content editors will preview changes in
  real-time. How fun!
  */
  useEffect(() => {
    const updatePage = (newLivePage: SanityTypes.GenericPage) => {
      setLivePage(newLivePage);
    };

    const settingsStream = Sanity.siteSettings.streamPreview(
      previewToken,
      setLiveSettings,
    );
    const pageStream = Sanity.page.streamPreview(id, previewToken, updatePage);

    return () => {
      settingsStream.unsubscribe();
      pageStream.unsubscribe();
    };
  }, [id, previewToken]);

  return <Page page={livePage} siteSettings={liveSettings} />;
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
  const genericPage = await Sanity.page
    .findPreview(id, previewToken)
    .then((genericPage) => {
      /*
    When a content editor begins editing a published document
    for the first time, we'll switch from a published document ID
    to a draft document ID (in the format of draft.{id}). When this
    happens, our page reloads. On the first reload, the Sanity document
    is not quite ready to be retrieved from the API. In the case that
    Sanity's API returns null for the given page, we retry after 1s.
    Most of the time, the document will be available at this point.
    */
      if (genericPage === null)
        return new Promise<SanityTypes.GenericPage>((resolve) => {
          setTimeout(() => {
            Sanity.page.findPreview(id, previewToken).then(resolve);
          }, 1000);
        });

      return genericPage;
    });

  const navigationOverrides = genericPage.navigationOverrides;

  return {
    props: {
      siteSettings,
      page: genericPage,
      navigationOverrides: navigationOverrides || null,
      previewToken,
      id,
    },
    notFound: !genericPage,
  };
};

export default GenericPagePreview;
