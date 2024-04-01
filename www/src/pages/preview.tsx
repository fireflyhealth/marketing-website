import React, { FC } from 'react';
import cn from 'classnames';
import { GetStaticProps } from 'next';
import { PageProps } from '@/types/next';
import * as Sanity from '@/lib/sanity';
import { RevalidationTime, Status } from '@/constants';
import { usePreviewData } from '@/hooks/usePreviewData';
import { PreviewProps } from '@/lib/sanity/previews';
import { HomeView } from '@/views/HomeView';
import { BlogPageView } from '@/views/Blog/BlogPageView';
import { FAQPageView } from '@/views/FAQPageView';
import { DownloadPageView } from '@/views/DownloadPageView';
import { ContactPageView } from '@/views/ContactPageView';
import { BlogArticleView } from '@/views/BlogArticleView/BlogArticleView';
import { ClientPageView } from '@/views/ClientPageView';
import { PageView } from '@/views/PageView';
import { ProviderPageView } from '@/views/ProviderView';

type PreviewMainProps = {
  previewProps: PreviewProps;
};

const PreviewMain: FC<PreviewMainProps> = ({
  previewProps,
}): React.ReactNode => {
  switch (previewProps.type) {
    case 'homepage':
      return <HomeView {...previewProps.viewProps} />;
    case 'blog':
      return <BlogPageView {...previewProps.viewProps} />;
    case 'faqPage':
      return <FAQPageView {...previewProps.viewProps} />;
    case 'downloadPage':
      return <DownloadPageView {...previewProps.viewProps} />;
    case 'contactPage':
      return <ContactPageView {...previewProps.viewProps} />;
    case 'blogArticle':
      return <BlogArticleView {...previewProps.viewProps} />;
    case 'clientPage':
      return <ClientPageView {...previewProps.viewProps} />;
    case 'genericPage':
      return <PageView {...previewProps.viewProps} />;
    case 'subPage':
      return <PageView {...previewProps.viewProps} />;
    case 'practitioner':
      return <ProviderPageView {...previewProps.viewProps} />;

    default:
      /* Make sure we can get the config for all linkable document types
       * (this will bug us to add preview config any time a new type is
       * added to LinkableDocument) */
      // @ts-expect-error
      throw new Error(`"${previewProps.type}" has not been configured`);
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
