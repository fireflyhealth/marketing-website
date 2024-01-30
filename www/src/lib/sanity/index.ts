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
import { siteSettingsFragment } from './queries';
import {
  metadataFragment,
  navigationOverridesFragment,
} from './queries/fragments';

export const client = createClient({
  projectId: 'xgbrv2vi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'development' ? false : true,
});

/**
 * Require credentials when fetching preview data
 */
const createSanityClient = (previewToken: string) => {
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
    return createSanityClient(previewToken).fetch<SiteSettings>(
      `*[_type == "siteSettings" && _id == "${SITE_SETTINGS_DRAFT_DOCUMENT_ID}"][0]{${siteSettingsFragment}}`,
    );
  },
  streamPreview(
    previewToken: string,
    callback: (siteSettings: SiteSettings) => void,
  ) {
    return createSanityClient(previewToken)
      .listen(
        `*[_type == "settings" && _id == "${SITE_SETTINGS_DRAFT_DOCUMENT_ID}"]`,
      )
      .subscribe(() => siteSettings.fetchPreview(previewToken).then(callback));
  },
};

/* Homepage */
export const homepage = {
  get: async (): Promise<Homepage> => {
    const homepage = await client.fetch(
      `*[_type == "homepage" && _id == "${HOMEPAGE_DOCUMENT_ID}"][0]`,
    );
    if (!homepage) {
      throw new Error('Could not fetch homepage');
    }
    return homepage;
  },
  fetchPreview(previewToken: string) {
    return createSanityClient(previewToken).fetch<Homepage>(
      `*[_type == "homepage" && (_id == "${HOMEPAGE_DRAFT_DOCUMENT_ID}" || _id == "${HOMEPAGE_DOCUMENT_ID}")][0]`,
    );
  },
  streamPreview(previewToken: string, callback: (homepage: Homepage) => void) {
    return createSanityClient(previewToken)
      .listen(
        `*[_type == "homepage" && _id == "${HOMEPAGE_DRAFT_DOCUMENT_ID}"]`,
      )
      .subscribe(() => homepage.fetchPreview(previewToken).then(callback));
  },
};

/* Generic Pages */
export const page = {
  get: (slug: string): Promise<GenericPage | null> =>
    client.fetch(
      `*[_type == "genericPage" && slug.current == $slug][0]{
      title,
      slug,
      navigationOverrides {${navigationOverridesFragment}},
      metadataFragment{${metadataFragment}},
    }`,
      {
        slug,
      },
    ),
  getSlugInfo: (): Promise<GenericPage[]> =>
    client.fetch(`*[_type == "genericPage"]{
        slug,
        subPages[]->{ slug },
      }`),
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
            title,
            slug,
            navigationOverrides {${navigationOverridesFragment}},
            metadataFragment{${metadataFragment}},
            "parentPage": *[
              _type == "genericPage"
              && slug.current == $parentSlug
              && ^._id in subPages[]._ref
            ] {
              slug,
            }[0],
            meta
          }[parentPage != null][0]`,

      { parentSlug, subpageSlug },
    );
    return subpage || null;
  },
};

/* Special pages */
export const downloadPage = {
  get: (): Promise<DownloadPage | null> =>
    client.fetch(`*[_type == "downloadPage" && _id == "downloadPage"][0]{
      title,
      slug,
      navigationOverrides {${navigationOverridesFragment}},
      metadataFragment{${metadataFragment}},
    }`),
};

export const contactPage = {
  get: (): Promise<ContactPage | null> =>
    client.fetch(`*[_type == "contactPage" && _id == "contactPage"][0]{
      title,
      slug,
      navigationOverrides {${navigationOverridesFragment}},
      metadataFragment{${metadataFragment}},
    }`),
};

export const notFoundPage = {
  get: (): Promise<NotFoundPage | null> =>
    client.fetch(`*[_type == "notFoundPage" && _id == "notFoundPage"][0]{
      title,
      slug,
      navigationOverrides {${navigationOverridesFragment}},
      metadataFragment{${metadataFragment}},
    }`),
};

export const faqPage = {
  get: (): Promise<FAQPage | null> =>
    client.fetch(`*[_type == "faqPage" && _id == "faqPage"][0]{
      title,
      slug,
      navigationOverrides {${navigationOverridesFragment}},
      metadataFragment{${metadataFragment}},
    }`),
};

/* Client Page */
export const clientPage = {
  get: (clientSlug: string): Promise<ClientPage | null> =>
    client.fetch(
      `*[_type == "clientPage" && slug.current == $clientSlug][0]{
      clientName,
      slug,
      navigationOverrides {${navigationOverridesFragment}},
      metadataFragment{${metadataFragment}},
    }`,
      {
        clientSlug,
      },
    ),
  getSlugInfo: (): Promise<GenericPage[]> =>
    client.fetch(`*[_type == "clientPage"]{
        slug,
      }`),
};
/* Blogs */
export const blog = {
  get: (blogSlug: string): Promise<Blog | null> =>
    client.fetch(
      `*[_type == "blog" && slug.current == $blogSlug][0]{
      title,
      slug,
      navigationOverrides {${navigationOverridesFragment}},
      metadataFragment{${metadataFragment}},
    }`,
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
  getArticle: async (
    blogSlug: string,
    articleSlug: string,
  ): Promise<BlogArticle | null> => {
    const article = await client.fetch(
      `*[
          _type == "blogArticle"
          && slug.current == $articleSlug
          && defined(category._ref)
        ]{
          title,
          category->{
            _type,
            title,
            slug
          },
          slug,
          navigationOverrides {${navigationOverridesFragment}},
          metadataFragment{${metadataFragment}},
        }[category.slug.current == $blogSlug][0]`,
      { blogSlug, articleSlug },
    );
    return article || null;
  },
};
