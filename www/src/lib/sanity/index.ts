import ImageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';
import {
  BlogArticle,
  Blog,
  ClientPage,
  ContactPage,
  DownloadPage,
  FAQPage,
  GenericPage,
  Homepage,
  SiteSettings,
  NotFoundPage,
  SubPage,
  Image,
  RichImage,
} from '@/types/sanity';
import { sleep } from '@/utils/misc';
import {
  blogArticleFragment,
  blogFragment,
  clientPageFragment,
  contactPageFragment,
  downloadPageFragment,
  faqPageFragment,
  genericPageFragment,
  notFoundPageFragment,
  siteSettingsFragment,
  subPageFragment,
} from './queries';

export const client = createClient({
  projectId: 'xgbrv2vi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'development' ? false : true,
});

/**
 * Require credentials when fetching preview data
 */
const createPreviewClient = (previewToken: string) => {
  return createClient({
    projectId: 'xgbrv2vi',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    withCredentials: true,
    token: previewToken,
  });
};

const builder = ImageUrlBuilder(client);

export const imageBuilder = {
  image: (image: Image | RichImage) => {
    return builder.image(image);
  },
};

const SITE_SETTINGS_DOCUMENT_ID = 'siteSettings';
const SITE_SETTINGS_DRAFT_DOCUMENT_ID = 'drafts.siteSettings';
const HOMEPAGE_DOCUMENT_ID = 'homepage';
const HOMEPAGE_DRAFT_DOCUMENT_ID = 'drafts.homepage';
const DOWNLOAD_DOCUMENT_ID = 'downloadPage';
const DOWNLOAD_DRAFT_DOCUMENT_ID = 'drafts.downloadPage';
const CONTACT_DOCUMENT_ID = 'contactPage';
const CONTACT_DRAFT_DOCUMENT_ID = 'drafts.contactPage';
const NOT_FOUND_DOCUMENT_ID = 'notFoundPage';
const NOT_FOUND_DRAFT_DOCUMENT_ID = 'drafts.notFoundPage';
const FAQ_DOCUMENT_ID = 'faqPage';
const FAQ_DRAFT_DOCUMENT_ID = 'drafts.faqPage';

/* Site Settings & Navigation */

export const siteSettings = {
  get: async (): Promise<SiteSettings> => {
    const siteSettings = await client.fetch<SiteSettings | null>(
      `*[_type == "siteSettings" && _id == "${SITE_SETTINGS_DOCUMENT_ID}"][0]{
        ${siteSettingsFragment}
      }`,
    );
    if (!siteSettings) {
      throw new Error('Could not fetch site settings');
    }
    return siteSettings;
  },
  fetchPreview(previewToken: string) {
    return createPreviewClient(previewToken).fetch<SiteSettings>(
      `*[_type == "siteSettings" && _id == "${SITE_SETTINGS_DRAFT_DOCUMENT_ID}"][0]{${siteSettingsFragment}}`,
    );
  },
  streamPreview(
    previewToken: string,
    callback: (siteSettings: SiteSettings) => void,
  ) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "siteSettings" && _id == "${SITE_SETTINGS_DRAFT_DOCUMENT_ID}"][0]`,
        {},
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return siteSettings.fetchPreview(previewToken).then(callback);
      });
  },
};

/* Homepage */
export const homepage = {
  get: async (): Promise<Homepage> => {
    const homepage = await client.fetch(
      `*[_type == "homepage" && _id == "${HOMEPAGE_DOCUMENT_ID}"][0] {${genericPageFragment}}`,
    );
    if (!homepage) {
      throw new Error('Could not fetch homepage');
    }
    return homepage;
  },
  fetchPreview(previewToken: string) {
    return createPreviewClient(previewToken).fetch<Homepage>(
      `*[_type == "homepage" && (_id == "${HOMEPAGE_DRAFT_DOCUMENT_ID}" || _id == "${HOMEPAGE_DOCUMENT_ID}")][0]`,
    );
  },
  streamPreview(previewToken: string, callback: (homepage: Homepage) => void) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "homepage" && _id == "${HOMEPAGE_DRAFT_DOCUMENT_ID}"][0]`,
        {},
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return homepage.fetchPreview(previewToken).then(callback);
      });
  },
};

/* Generic Pages */
export const page = {
  get: (slug: string): Promise<GenericPage | null> =>
    client.fetch(
      `*[_type == "genericPage" && slug.current == $slug][0]{${genericPageFragment}}`,
      {
        slug,
      },
    ),
  getSlugInfo: (): Promise<GenericPage[]> =>
    client.fetch(`*[_type == "genericPage"]{
        slug,
        subPages[]->{ slug },
      }`),
  findPreview(id: string, previewToken: string) {
    return createPreviewClient(previewToken).fetch<GenericPage>(
      `*[_type == "genericPage" && _id == $id][0]{${genericPageFragment}}`,
      {
        id,
      },
    );
  },
  streamPreview(
    id: string,
    previewToken: string,
    callback: (genericPage: GenericPage) => void,
  ) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "genericPage" && _id == $id][0]`,
        { id },
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return page.findPreview(id, previewToken).then(callback);
      });
  },
};

export const subPage = {
  get: async (
    parentSlug: string,
    subpageSlug: string,
  ): Promise<SubPage | null> => {
    const subpage = await client.fetch(
      `*[_type == "subPage"
            && slug.current == $subpageSlug
          ]{
            ${subPageFragment},
            "parentPage": *[
              _type == "genericPage"
              && slug.current == $parentSlug
              && ^._id in subPages[]._ref
            ] {
              slug,
            }[0],
          }[parentPage != null][0]`,

      { parentSlug, subpageSlug },
    );
    return subpage || null;
  },
  findPreview(id: string, previewToken: string) {
    return createPreviewClient(previewToken).fetch<SubPage>(
      `*[_type == "subPage" && _id == $id][0]{${subPageFragment}}`,
      {
        id,
      },
    );
  },
  streamPreview(
    id: string,
    previewToken: string,
    callback: (subPage: SubPage) => void,
  ) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "subPage" && _id == $id]`,
        { id },
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return subPage.findPreview(id, previewToken).then(callback);
      });
  },
};

/* Special pages */
export const downloadPage = {
  get: (): Promise<DownloadPage | null> =>
    client.fetch(
      `*[_type == "downloadPage" && _id == "${DOWNLOAD_DOCUMENT_ID}"][0]{${downloadPageFragment}}`,
    ),
  fetchPreview(previewToken: string) {
    return createPreviewClient(previewToken).fetch<DownloadPage>(
      `*[_type == "downloadPage" && (_id == "${DOWNLOAD_DRAFT_DOCUMENT_ID}" || _id == "${DOWNLOAD_DOCUMENT_ID}")]| score(_id in path("drafts.**"))[0]{${downloadPageFragment}}`,
    );
  },
  streamPreview(
    previewToken: string,
    callback: (downloadPage: DownloadPage) => void,
  ) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "downloadPage" && _id == "${DOWNLOAD_DRAFT_DOCUMENT_ID}"][0]`,
        {},
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return downloadPage.fetchPreview(previewToken).then(callback);
      });
  },
};

export const contactPage = {
  get: (): Promise<ContactPage | null> =>
    client.fetch(
      `*[_type == "contactPage" && _id == "contactPage"][0]{${contactPageFragment}}`,
    ),
  fetchPreview(previewToken: string) {
    return createPreviewClient(previewToken).fetch<ContactPage>(
      `*[_type == "contactPage" && (_id == "${CONTACT_DRAFT_DOCUMENT_ID}" || _id == "${CONTACT_DOCUMENT_ID}")]| score(_id in path("drafts.**"))[0]{${contactPageFragment}}`,
    );
  },
  streamPreview(
    previewToken: string,
    callback: (contactPage: ContactPage) => void,
  ) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "contactPage" && _id == "${CONTACT_DRAFT_DOCUMENT_ID}"]`,
        {},
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return contactPage.fetchPreview(previewToken).then(callback);
      });
  },
};

export const notFoundPage = {
  get: (): Promise<NotFoundPage | null> =>
    client.fetch(
      `*[_type == "notFoundPage" && _id == "notFoundPage"][0]{${notFoundPageFragment}}`,
    ),
  fetchPreview(previewToken: string) {
    return createPreviewClient(previewToken).fetch<NotFoundPage>(
      `*[_type == "notFoundPage" && (_id == "${NOT_FOUND_DRAFT_DOCUMENT_ID}" || _id == "${NOT_FOUND_DOCUMENT_ID}")][0]{${notFoundPageFragment}}`,
    );
  },
  streamPreview(
    previewToken: string,
    callback: (notFoundPage: NotFoundPage) => void,
  ) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "notFoundPage" && _id == "${NOT_FOUND_DRAFT_DOCUMENT_ID}"]`,
        {},
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return notFoundPage.fetchPreview(previewToken).then(callback);
      });
  },
};

export const faqPage = {
  get: (): Promise<FAQPage | null> =>
    client.fetch(
      `*[_type == "faqPage" && _id == "faqPage"][0]{${faqPageFragment}}`,
    ),
  fetchPreview(previewToken: string) {
    return createPreviewClient(previewToken).fetch<FAQPage>(
      `*[_type == "faqPage" && (_id == "${FAQ_DRAFT_DOCUMENT_ID}" || _id == "${FAQ_DOCUMENT_ID}")][0]{${faqPageFragment}}`,
    );
  },
  streamPreview(previewToken: string, callback: (faqPage: FAQPage) => void) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "faqPage" && _id == "${FAQ_DRAFT_DOCUMENT_ID}"]`,
        {},
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return faqPage.fetchPreview(previewToken).then(callback);
      });
  },
};

/* Client Page */
export const clientPage = {
  get: (clientSlug: string): Promise<ClientPage | null> =>
    client.fetch(
      `*[_type == "clientPage" && slug.current == $clientSlug][0]{${clientPageFragment}}`,
      {
        clientSlug,
      },
    ),
  getSlugInfo: (): Promise<GenericPage[]> =>
    client.fetch(`*[_type == "clientPage"]{
        slug,
      }`),
  findPreview(id: string, previewToken: string) {
    return createPreviewClient(previewToken).fetch<ClientPage>(
      `*[_type == "clientPage" && _id == $id][0]{${clientPageFragment}}`,
      {
        id,
      },
    );
  },
  streamPreview(
    id: string,
    previewToken: string,
    callback: (clientPage: ClientPage) => void,
  ) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "clientPage" && _id == $id]`,
        { id },
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return clientPage.findPreview(id, previewToken).then(callback);
      });
  },
};

/* Blogs */
export const blog = {
  get: (blogSlug: string): Promise<Blog | null> =>
    client.fetch(
      `*[_type == "blog" && slug.current == $blogSlug][0]{${blogFragment}}`,
      {
        blogSlug,
      },
    ),
  getSlugInfo: (): Promise<Blog[]> =>
    client.fetch(
      `*[_type == "blog"]{
          slug,
          "articles": *[
            _type == "blogArticle"
            && category._ref == ^._id
          ] {
            slug
          }
        }`,
    ),
  findPreview(id: string, previewToken: string) {
    return createPreviewClient(previewToken).fetch<Blog>(
      `*[_type == "blog" && _id == $id][0]{${blogFragment}}`,
      {
        id,
      },
    );
  },
  streamPreview(
    id: string,
    previewToken: string,
    callback: (blog: Blog) => void,
  ) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "blog" && _id == $id]`,
        { id },
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return blog.findPreview(id, previewToken).then(callback);
      });
  },
  getArticle: async (
    blogSlug: string,
    articleSlug: string,
  ): Promise<BlogArticle | null> => {
    const article = await client.fetch(
      `*[
          _type == "blogArticle"
          && slug.current == $articleSlug
          && defined(category._ref)
        ]{${blogArticleFragment}}[category.slug.current == $blogSlug][0]`,
      { blogSlug, articleSlug },
    );
    return article || null;
  },
  findBlogArticlePreview(id: string, previewToken: string) {
    return createPreviewClient(previewToken).fetch<BlogArticle>(
      `*[_type == "blogArticle" && _id == $id][0]{${blogArticleFragment}}`,
      {
        id,
      },
    );
  },
  streamBlogArticlePreview(
    id: string,
    previewToken: string,
    callback: (blogArticle: BlogArticle) => void,
  ) {
    return createPreviewClient(previewToken)
      .listen(
        `*[_type == "blogArticle" && _id == $id]`,
        { id },
        { visibility: 'query' },
      )
      .subscribe(async () => {
        await sleep(1000);
        return blog.findBlogArticlePreview(id, previewToken).then(callback);
      });
  },
};
