import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import * as Sanity from '@/lib/sanity';
import * as SanityTypes from '@/types/sanity';
import * as NextTypes from '@/types/next';

import Home, { HomeProps } from '@/pages';

const HomepagePreview: NextTypes.PageRoute<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ homepage, siteSettings, previewToken }) => {
  const [livePage, setLivePage] = useState(homepage);
  const [liveSettings, setLiveSettings] = useState(siteSettings);

  /*
  We subscribe to our queries here and listen to real-time updates.
  This means our preview will automatically rerender as new updates
  come in from Sanity. This allows us to render our page preview next
  to our Sanity Studio and content editors will preview changes in
  real-time. How fun!
  */
  useEffect(() => {
    const settingsStream = Sanity.siteSettings.streamPreview(
      previewToken,
      setLiveSettings,
    );
    const pageStream = Sanity.homepage.streamPreview(previewToken, setLivePage);

    return () => {
      settingsStream.unsubscribe();
      pageStream.unsubscribe();
    };
  }, [previewToken]);

  return <Home homepage={livePage} siteSettings={liveSettings} />;
};

export const getServerSideProps: GetServerSideProps<
  HomeProps & { previewToken: string }
> = async (context) => {
  // @ts-ignore
  const previewToken: string = context.query.sanityPreviewToken;
  if (!previewToken) return { notFound: true };
  const siteSettings = await Sanity.siteSettings.get();
  const homepage = await Sanity.homepage
    .fetchPreview(previewToken)
    .then((homepage) => {
      /*
    When a content editor begins editing a published document
    for the first time, we'll switch from a published document ID
    to a draft document ID (in the format of draft.{id}). When this
    happens, our page reloads. On the first reload, the Sanity document
    is not quite ready to be retrieved from the API. In the case that
    Sanity's API returns null for the given page, we retry after 1s.
    Most of the time, the document will be available at this point.
    */

      if (homepage === null)
        return new Promise<SanityTypes.Homepage>((resolve) => {
          setTimeout(() => {
            Sanity.homepage.fetchPreview(previewToken).then(resolve);
          }, 1000);
        });

      return homepage;
    });

  const navigationOverrides = homepage.navigationOverrides;

  return {
    props: {
      siteSettings,
      homepage,
      navigationOverrides: navigationOverrides || null,
      previewToken,
    },
    notFound: !homepage,
  };
};

export default HomepagePreview;
