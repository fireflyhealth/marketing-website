import React, { FC } from 'react';
import cn from 'classnames';
import { GetStaticProps } from 'next';
import { PageProps } from '@/types/next';
import * as Sanity from '@/lib/sanity';
import { RevalidationTime, Status } from '@/constants';
import { usePreviewData } from '@/hooks/usePreviewData';
import { PreviewProps } from '@/lib/sanity/previews';
import { HomeView } from '@/views/HomeView';

type PreviewMainProps = {
  previewProps: PreviewProps;
};

const PreviewMain: FC<PreviewMainProps> = ({ previewProps }) => {
  switch (previewProps.view) {
    case 'homepage':
      return <HomeView {...previewProps.viewProps} />;

    /* TODO */
    // case 'blog':
    //   return <BlogView {...previewProps.viewProps} />;
    default:
      console.warn(
        // @ts-expect-error
        `"${previewProps.view.toString()}" is not a valid preview type`,
      );
      return null;
  }
};

const PreviewPage: FC<PageProps> = () => {
  const preview = usePreviewData();

  if (
    /* Show the loading state before the initial request is sent */
    preview.status === Status.Idle ||
    /* and while it is pending */
    (preview.status === Status.Pending && !preview.previewProps)
  ) {
    return (
      <div
        className={cn(
          'p-6 md:p-12 lg:p-16',
          'font-roobert',
          'text-center font-size-6 theme-text-color-decorative',
        )}
      >
        Fetching preview data...
      </div>
    );
  }

  if (preview.status === Status.Rejected) {
    return (
      <div
        className={cn(
          'p-6 md:p-12 lg:p-16',
          'font-roobert',
          'text-center font-size-6 theme-text-color-secondary',
        )}
      >
        Sorry, an error occurred.
        <div className="mt-4 font-size-8 text-[red]">
          {preview.errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {preview.status === Status.Pending ? (
        <div className="absolute top-2 left-2">loading</div>
      ) : null}
      {preview.previewProps ? (
        <PreviewMain previewProps={preview.previewProps} />
      ) : null}
    </div>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const siteSettings = await Sanity.siteSettings.get();

  return {
    props: { siteSettings },
    revalidate: RevalidationTime.Always,
  };
};

export default PreviewPage;
