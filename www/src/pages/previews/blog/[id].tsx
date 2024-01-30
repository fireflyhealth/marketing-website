import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import * as Sanity from '@/lib/sanity';
import * as SanityTypes from '@/types/sanity';
import * as NextTypes from '@/types/next';

import BlogPage, { BlogPageProps } from '@/pages/blog/[blogSlug]';

const BlogPreview: NextTypes.PageRoute<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ blog, siteSettings, previewToken, id }) => {
  const [livePost, setLivePost] = useState(blog);
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
    const postStream = Sanity.blog.streamPreview(id, previewToken, setLivePost);

    return () => {
      settingsStream.unsubscribe();
      postStream.unsubscribe();
    };
  }, [id, previewToken]);

  return <BlogPage blog={livePost} siteSettings={liveSettings} />;
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
  const blog = await Sanity.blog.findPreview(id, previewToken).then((blog) => {
    /*
    When a content editor begins editing a published document
    for the first time, we'll switch from a published document ID
    to a draft document ID (in the format of draft.{id}). When this
    happens, our page reloads. On the first reload, the Sanity document
    is not quite ready to be retrieved from the API. In the case that
    Sanity's API returns null for the given page, we retry after 1s.
    Most of the time, the document will be available at this point.
    */
    if (blog === null)
      return new Promise<SanityTypes.Blog>((resolve) => {
        setTimeout(() => {
          Sanity.blog.findPreview(id, previewToken).then(resolve);
        }, 1000);
      });

    return blog;
  });

  const navigationOverrides = blog.navigationOverrides;

  return {
    props: {
      siteSettings,
      blog,
      navigationOverrides: navigationOverrides || null,
      previewToken,
      id,
    },
    notFound: !blog,
  };
};

export default BlogPreview;
