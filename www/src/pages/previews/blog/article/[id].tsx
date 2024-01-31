import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import * as Sanity from '@/lib/sanity';
import * as SanityTypes from '@/types/sanity';
import * as NextTypes from '@/types/next';

import Page, { BlogPageProps } from '@/pages/blog/[blogSlug]/[articleSlug]';

const BlogArticlePreview: NextTypes.PageRoute<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ article, siteSettings, previewToken, id }) => {
  const [livePost, setLivePost] = useState(article);
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
    const postStream = Sanity.blog.streamBlogArticlePreview(
      id,
      previewToken,
      setLivePost,
    );

    return () => {
      settingsStream.unsubscribe();
      postStream.unsubscribe();
    };
  }, [id, previewToken]);

  return <Page article={livePost} siteSettings={liveSettings} />;
};

export const getServerSideProps: GetServerSideProps<
  BlogPageProps & { id: string; previewToken: string }
> = async (context) => {
  // @ts-ignore
  const id: string = context.params.id;
  // @ts-ignore
  const previewToken: string = context.query.sanityPreviewToken;
  if (!id || !previewToken) return { notFound: true };

  const siteSettings = await Sanity.siteSettings.get();
  const blogArticle = await Sanity.blog
    .findBlogArticlePreview(id, previewToken)
    .then((blogArticle) => {
      /*
    When a content editor begins editing a published document
    for the first time, we'll switch from a published document ID
    to a draft document ID (in the format of draft.{id}). When this
    happens, our page reloads. On the first reload, the Sanity document
    is not quite ready to be retrieved from the API. In the case that
    Sanity's API returns null for the given page, we retry after 1s.
    Most of the time, the document will be available at this point.
    */
      if (blogArticle === null)
        return new Promise<SanityTypes.BlogArticle>((resolve) => {
          setTimeout(() => {
            Sanity.blog.findBlogArticlePreview(id, previewToken).then(resolve);
          }, 1000);
        });

      return blogArticle;
    });

  const navigationOverrides = blogArticle.navigationOverrides;

  return {
    props: {
      siteSettings,
      article: blogArticle,
      navigationOverrides: navigationOverrides || null,
      previewToken,
      id,
    },
    notFound: !blogArticle,
  };
};

export default BlogArticlePreview;
