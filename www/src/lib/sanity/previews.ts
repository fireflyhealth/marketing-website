import { createClient } from '@sanity/client';
import { config } from '@/config';
import { HomeViewProps } from '@/views/HomeView';
import {
  Blog,
  BlogArticle,
  ClientPage,
  ContactPage,
  DownloadPage,
  FAQPage,
  GenericPage,
  Homepage,
  SubPage,
  Practitioner,
} from '@/types/sanity';
import { BlogPageViewProps } from '@/views/Blog/BlogPageView';
import { FAQPageViewProps } from '@/views/FAQPageView';
import { DownloadPageViewProps } from '@/views/DownloadPageView';
import { BlogArticleViewProps } from '@/views/BlogArticleView/BlogArticleView';
import { ContactPageViewProps } from '@/views/ContactPageView';
import { PageViewProps } from '@/views/PageView';
import { ClientPageViewProps } from '@/views/ClientPageView';
import { PAGINATION_PAGE_SIZE } from '@/constants';
import { ProviderPageViewProps } from '@/views/ProviderView';
import {
  blogArticleFragment,
  blogFragment,
  contactPageFragment,
  downloadPageFragment,
  faqPageFragment,
  pageFragment,
  practitionerPageFragment,
} from './queries';
import { blogArticleLinkDataFragment } from './queries/fragments';

/**
 * Constants
 */

type HomePreviewProps = {
  type: 'homepage';
  viewProps: HomeViewProps;
};

type FAQPagePreviewProps = {
  type: 'faqPage';
  viewProps: FAQPageViewProps;
};
type DownloadPagePreviewProps = {
  type: 'downloadPage';
  viewProps: DownloadPageViewProps;
};
type BlogArticlePreviewProps = {
  type: 'blogArticle';
  viewProps: BlogArticleViewProps;
};
type BlogPreviewProps = {
  type: 'blog';
  viewProps: BlogPageViewProps;
};
type ContactPagePreviewProps = {
  type: 'contactPage';
  viewProps: ContactPageViewProps;
};
type GenericPagePreviewProps = {
  type: 'genericPage';
  viewProps: PageViewProps;
};
type SubpagePreviewProps = {
  type: 'subPage';
  viewProps: PageViewProps;
};
type ClientPagePreviewProps = {
  type: 'clientPage';
  viewProps: ClientPageViewProps;
};
type ProviderPagePreviewProps = {
  type: 'practitioner';
  viewProps: ProviderPageViewProps;
};

export type PreviewProps =
  | HomePreviewProps
  | BlogPreviewProps
  | FAQPagePreviewProps
  | DownloadPagePreviewProps
  | ContactPagePreviewProps
  | BlogArticlePreviewProps
  | BlogPreviewProps
  | ClientPagePreviewProps
  | GenericPagePreviewProps
  | SubpagePreviewProps
  | ProviderPagePreviewProps;

export const createPreviewClient = (previewToken: string) => {
  const previewClient = createClient({
    ...config.sanity,
    useCdn: false,
    withCredentials: true,
    token: previewToken,
  });

  return {
    document: {
      getType: async (id: string): Promise<null> => {
        const document = await previewClient.fetch(
          `*[_id == "${id}"][0]{ _type }`,
        );
        if (!document) return null;
        return document._type;
      },
    },
    homepage: {
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "homepage" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (draftId: string): Promise<HomePreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const homepage = await previewClient.fetch<Homepage>(
          `*[
             _type == "homepage"
             && (_id == $draftId || _id == $nonDraftId)
           ][0]{${pageFragment}}`,
          { draftId, nonDraftId },
        );
        return { type: 'homepage', viewProps: { homepage } };
      },
    },
    blog: {
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "blog" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (draftId: string): Promise<BlogPreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const from = PAGINATION_PAGE_SIZE;
        /* Overfetch by 1 to see if there are additional pages */
        const to = from + PAGINATION_PAGE_SIZE + 1;

        const [blog, initialArticles] = await Promise.all([
          previewClient.fetch<Blog>(
            `*[
             _type == "blog"
             && (_id == $draftId || _id == $nonDraftId)
           ][0]{${blogFragment}}`,
            { draftId, nonDraftId },
          ),
          previewClient.fetch<BlogArticle[]>(
            `*[_type == "blogArticle" && category->_id == $blogNonDraftId]{
            ${blogArticleLinkDataFragment}
          }[$from..$to]`,
            { blogNonDraftId: nonDraftId, from, to },
          ),
        ]);
        const initialArticlesPage = {
          page: 0,
          hasNextPage: initialArticles.length > PAGINATION_PAGE_SIZE,
          articles: initialArticles.slice(0, PAGINATION_PAGE_SIZE),
        };
        return { type: 'blog', viewProps: { blog, initialArticlesPage } };
      },
    },
    clientPage: {
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "client" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (
        draftId: string,
      ): Promise<ClientPagePreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const clientPage = await previewClient.fetch<ClientPage>(
          `*[
             _type == "client"
             && (_id == $draftId || _id == $nonDraftId)
           ][0]{${blogFragment}}`,
          { draftId, nonDraftId },
        );
        return { type: 'clientPage', viewProps: { clientPage } };
      },
    },
    faqPage: {
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "faqPage" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (draftId: string): Promise<FAQPagePreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const faqPage = await previewClient.fetch<FAQPage>(
          `*[
             _type == "faqPage"
             && (_id == $draftId || _id == $nonDraftId)
           ][0]{${faqPageFragment}}`,
          { draftId, nonDraftId },
        );
        return { type: 'faqPage', viewProps: { faqPage } };
      },
    },
    downloadPage: {
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "faqPage" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (
        draftId: string,
      ): Promise<DownloadPagePreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const downloadPage = await previewClient.fetch<DownloadPage>(
          `*[
             _type == "downloadPage"
             && (_id == $draftId || _id == $nonDraftId)
           ][0]{${downloadPageFragment}}`,
          { draftId, nonDraftId },
        );
        return { type: 'downloadPage', viewProps: { downloadPage } };
      },
    },
    contactPage: {
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "contactPage" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (
        draftId: string,
      ): Promise<ContactPagePreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const contactPage = await previewClient.fetch<ContactPage>(
          `*[
             _type == "contactPage"
             && (_id == $draftId || _id == $nonDraftId)
           ][0]{${contactPageFragment}}`,
          { draftId, nonDraftId },
        );
        return { type: 'contactPage', viewProps: { contactPage } };
      },
    },
    blogArticle: {
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "blogArticle" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (
        draftId: string,
      ): Promise<BlogArticlePreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const article = await previewClient.fetch<BlogArticle>(
          `*[
             _type == "blogArticle"
             && (_id == $draftId || _id == $nonDraftId)
           ][0]{${blogArticleFragment}}`,
          { draftId, nonDraftId },
        );
        return { type: 'blogArticle', viewProps: { article } };
      },
    },
    genericPage: {
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "genericPage" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (
        draftId: string,
      ): Promise<GenericPagePreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const page = await previewClient.fetch<GenericPage>(
          `*[
             _type == "genericPage"
             && (_id == $draftId || _id == $nonDraftId)
           ][0]{${pageFragment}}`,
          { draftId, nonDraftId },
        );
        return { type: 'genericPage', viewProps: { page } };
      },
    },
    subPage: {
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "subPage" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (draftId: string): Promise<SubpagePreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const page = await previewClient.fetch<SubPage>(
          `*[
             _type == "genericPage"
             && (_id == $draftId || _id == $nonDraftId)
           ][0]{${pageFragment}}`,
          { draftId, nonDraftId },
        );
        return { type: 'subPage', viewProps: { page } };
      },
    },
    providerPage: {
      /* Fetch all practitioner documents no matter if they should or should not render a provider page */
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "practitioner" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (
        draftId: string,
      ): Promise<ProviderPagePreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const provider = await previewClient.fetch<Practitioner>(
          `*[
             _type == "practitioner"
             && (_id == $draftId || _id == $nonDraftId)
           ]| score(_id in path("drafts.**"))[0]{${practitionerPageFragment}}`,
          { draftId, nonDraftId },
        );
        return { type: 'practitioner', viewProps: { provider } };
      },
    },
  };
};
