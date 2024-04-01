import ImageUrlBuilder from '@sanity/image-url';
import { SanityReference, createClient } from '@sanity/client';
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
  BlogArticlePagination,
  BlogWithArticles,
  HomepageLinkData,
  FAQPageLinkData,
  ContactPageLinkData,
  DownloadPageLinkData,
  GenericPageLinkData,
  SubPageLinkData,
  BlogLinkData,
  BlogArticleLinkData,
  ClientPageLinkData,
  PractitionerLinkData,
  Practitioner,
  Maybe,
} from '@/types/sanity';
import { PAGINATION_PAGE_SIZE } from '@/constants';
import { config } from '@/config';
import {
  blogArticleFragment,
  blogFragment,
  contactPageFragment,
  downloadPageFragment,
  faqPageFragment,
  pageFragment,
  notFoundPageFragment,
  siteSettingsFragment,
  providerPageFragment,
  subPageFragment,
} from './queries';
import {
  blogArticleLinkDataFragment,
  isNotVariantFilter,
  linkableDocumentFragment,
} from './queries/fragments';

export const client = createClient(config.sanity);

const builder = ImageUrlBuilder(client);

export const imageBuilder = {
  image: (image: Image | RichImage) => {
    return builder.image(image);
  },
};

const SITE_SETTINGS_DOCUMENT_ID = 'siteSettings';
const HOMEPAGE_DOCUMENT_ID = 'homepage';
const DOWNLOAD_DOCUMENT_ID = 'downloadPage';

type WithDocumentVariantInfo<T extends any = any> = T & {
  documentVariantInfo?: Maybe<{
    variantOf?: Maybe<SanityReference>;
    isEnabled?: Maybe<boolean>;
    variantDocument?: Maybe<SanityReference>;
  }>;
};

export const getDocumentVariantId = (
  doc: WithDocumentVariantInfo<any>,
): string | void => doc.documentVariantInfo?.variantDocument?._ref;

export type QueryConfig = {
  preferBContent?: boolean;
};

/**
 * Fetches the B content for a document if:
 * - A primary document was fetched
 * - The primary document has a documentVariant reference
 * - config.preferBContent is true
 *
 * Falls back to the primary document if B content is not found.
 */
const withMaybeBContent = async <T extends WithDocumentVariantInfo | null>(
  primaryDocument: T,
  config: QueryConfig,
  pageContentFragment: string,
  params: Record<string, any> = {},
): Promise<T | null> => {
  if (!primaryDocument) return null;
  const variantId = getDocumentVariantId(primaryDocument);
  if (!config.preferBContent || !variantId) return primaryDocument;
  const bDocument = await client.fetch<T>(
    `*[
      _id == $variantId
      && defined(documentVariantInfo.variantOf)
      && documentVariantInfo.isActive
    ]{
      ${pageContentFragment}
    }[0]`,
    { variantId, ...params },
  );
  return bDocument || primaryDocument;
};

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
};

/* Homepage */
export const homepage = {
  get: async (config: QueryConfig = {}): Promise<Homepage> => {
    const primaryHomepage =
      await client.fetch<WithDocumentVariantInfo<Homepage> | null>(
        `*[
          _type == "homepage"
          && _id == "${HOMEPAGE_DOCUMENT_ID}"
          && ${isNotVariantFilter}
        ][0] {
        documentVariantInfo,
        ${pageFragment}
      }`,
      );
    const homepage = await withMaybeBContent(
      primaryHomepage,
      config,
      pageFragment,
    );

    if (!homepage) {
      throw new Error('Could not fetch homepage');
    }
    return homepage;
  },
};

/* Generic Pages */
export const page = {
  get: async (
    slug: string,
    config: QueryConfig = {},
  ): Promise<GenericPage | null> => {
    const genericPage =
      await client.fetch<WithDocumentVariantInfo<GenericPage> | null>(
        `*[
          _type == "genericPage"
          && slug.current == $slug
          && ${isNotVariantFilter}
        ][0]{
          documentVariantInfo,
          ${pageFragment}
        }`,
        {
          slug,
        },
      );
    return withMaybeBContent(genericPage, config, pageFragment);
  },
  getSlugInfo: (): Promise<GenericPage[]> =>
    client.fetch(`*[_type == "genericPage" && ${isNotVariantFilter}]{
        slug,
        subPages[]->{ slug },
      }`),
};

export const subPage = {
  get: async (
    parentSlug: string,
    subpageSlug: string,
    config: QueryConfig = {},
  ): Promise<SubPage | null> => {
    const params = { parentSlug, subpageSlug };
    const subPage = await client.fetch<WithDocumentVariantInfo<SubPage> | null>(
      `*[_type == "subPage"
          && slug.current == $subpageSlug
          && ${isNotVariantFilter}
        ]{
          documentVariantInfo,
          ${subPageFragment},
       }[parentPage != null][0]`,
      params,
    );
    return withMaybeBContent(subPage, config, subPageFragment, params);
  },
};

/* Special pages */
export const downloadPage = {
  get: async (config: QueryConfig = {}): Promise<DownloadPage | null> => {
    const downloadPage =
      await client.fetch<WithDocumentVariantInfo<DownloadPage> | null>(
        `*[
          _type == "downloadPage"
          && _id == "${DOWNLOAD_DOCUMENT_ID}"
          && ${isNotVariantFilter}
        ][0]{
          documentVariantInfo,
          ${downloadPageFragment}
        }`,
      );

    return withMaybeBContent(downloadPage, config, downloadPageFragment);
  },
};

export const contactPage = {
  get: async (config: QueryConfig = {}): Promise<ContactPage | null> => {
    const contactPage =
      await client.fetch<WithDocumentVariantInfo<ContactPage> | null>(
        `*[
          _type == "contactPage"
          && _id == "contactPage"
          && ${isNotVariantFilter}
        ][0]{
          documentVariantInfo,
          ${contactPageFragment}
        }`,
      );
    return withMaybeBContent(contactPage, config, contactPageFragment);
  },
};

export const notFoundPage = {
  get: (): Promise<NotFoundPage | null> =>
    client.fetch(
      `*[_type == "notFoundPage" && _id == "notFoundPage"][0]{${notFoundPageFragment}}`,
    ),
};

export const faqPage = {
  get: (): Promise<FAQPage | null> =>
    client.fetch(
      `*[_type == "faqPage" && _id == "faqPage"][0]{${faqPageFragment}}`,
    ),
};

/* Client Page */
export const clientPage = {
  get: async (
    clientSlug: string,
    config: QueryConfig = {},
  ): Promise<ClientPage | null> => {
    const clientPage =
      await client.fetch<WithDocumentVariantInfo<ClientPage> | null>(
        `*[
          _type == "clientPage"
          && slug.current == $clientSlug
          && ${isNotVariantFilter}
        ][0]{
        documentVariantInfo,
        ${pageFragment}
      }`,
        {
          clientSlug,
        },
      );
    return withMaybeBContent(clientPage, config, pageFragment);
  },
  getSlugInfo: (): Promise<GenericPage[]> =>
    client.fetch(`*[_type == "clientPage" && ${isNotVariantFilter}]{
      slug,
    }`),
};

/* Blogs */

export const blog = {
  get: async (
    blogSlug: string,
    config: QueryConfig = {},
  ): Promise<Blog | null> => {
    const blog = await client.fetch<WithDocumentVariantInfo<Blog> | null>(
      `*[
        _type == "blog"
        && slug.current == $blogSlug
        && ${isNotVariantFilter}
      ][0]{
        documentVariantInfo,
        ${blogFragment}
      }`,
      {
        blogSlug,
      },
    );
    return withMaybeBContent(blog, config, blogFragment);
  },

  getSlugInfo: (): Promise<BlogWithArticles[]> =>
    client.fetch(
      `*[
          _type == "blog"
          && ${isNotVariantFilter}
       ]{
          slug,
          "articles": *[
            _type == "blogArticle"
            && category._ref == ^._id
          ] {
            slug
          }
        }`,
    ),

  getBlogArticles: async (
    blogSlug: string,
    page: number = 0,
    tagSlug?: string,
  ): Promise<BlogArticlePagination> => {
    const from = page * PAGINATION_PAGE_SIZE;
    /* Overfetch by 1 to see if there are additional pages */
    const to = from + PAGINATION_PAGE_SIZE + 1;
    const articles = await client.fetch<BlogArticle[]>(
      `*[
          _type == "blogArticle"
          && category->slug.current == $blogSlug
          && (
            $tagSlug == null ||
            $tagSlug in tags[]->slug.current
          )
          && ${isNotVariantFilter}
        ]{
          ${blogArticleLinkDataFragment}
        }[$from..$to]`,
      { blogSlug, from, to, tagSlug: tagSlug || null },
    );
    /* Slice off the possible over-fetched article */
    const slicedArticles = articles.slice(0, PAGINATION_PAGE_SIZE);
    return {
      page,
      hasNextPage: articles.length > PAGINATION_PAGE_SIZE,
      articles: slicedArticles,
    };
  },
  getArticle: async (
    blogSlug: string,
    articleSlug: string,
    config: QueryConfig = {},
  ): Promise<BlogArticle | null> => {
    const params = { blogSlug, articleSlug };
    const article =
      await client.fetch<WithDocumentVariantInfo<BlogArticle> | null>(
        `*[
          _type == "blogArticle"
          && slug.current == $articleSlug
          && defined(category._ref)
          && ${isNotVariantFilter}
        ]{
          documentVariantInfo,
          ${blogArticleFragment}
        }[category.slug.current == $blogSlug][0]`,
        params,
      );
    return withMaybeBContent(article, config, blogArticleFragment);
  },
};

/* Provider Page */
export const providerPage = {
  /* (production) do not fetch slugs for practitioners that should not render a provider page */
  /* (preview) fetch all practitioners wether or not they should render a provider page - see preview queries 'src/lib/sanity/previews' */
  get: async (
    practitionerSlug: string,
    config: QueryConfig = {},
  ): Promise<Practitioner | null> => {
    const provider =
      await client.fetch<WithDocumentVariantInfo<Practitioner> | null>(
        `*[
          _type == "practitioner"
          && slug.current == $practitionerSlug
          && renderProviderPage != false
          && ${isNotVariantFilter}
        ][0]{
          documentVariantInfo,
          ${providerPageFragment}
        }`,
        {
          practitionerSlug,
        },
      );

    return withMaybeBContent(provider, config, blogArticleFragment);
  },
  getSlugInfo: (): Promise<Practitioner[]> =>
    client.fetch(`*[_type == "practitioner" && ${isNotVariantFilter}]{
      slug,
      renderProviderPage,
    }`),
};

/**
 * Sitemap
 */
export type SitemapData = {
  homepage: HomepageLinkData;
  faqPage: FAQPageLinkData;
  contactPage: ContactPageLinkData;
  downloadPage: DownloadPageLinkData;
  genericPage: GenericPageLinkData[];
  subPage: SubPageLinkData[];
  blog: BlogLinkData[];
  blogArticle: BlogArticleLinkData[];
  clientPage: ClientPageLinkData[];
  practitioner: PractitionerLinkData[];
};

const SITEMAP_DATA_QUERY = `
{
  "homepage": *[_type == "homepage"][0]{${linkableDocumentFragment}},
  "faqPage": *[_type == "faqPage"][0]{${linkableDocumentFragment}},
  "contactPage": *[_type == "contactPage"][0]{${linkableDocumentFragment}},
  "downloadPage": *[_type == "downloadPage"][0]{${linkableDocumentFragment}},
  "genericPage": *[_type == "genericPage"]{${linkableDocumentFragment}},
  "subPage": *[_type == "subPage"]{${linkableDocumentFragment}},
  "blog": *[_type == "blog"]{${linkableDocumentFragment}},
  "blogArticle": *[_type == "blogArticle"]{${linkableDocumentFragment}},
  "clientPage": *[_type == "clientPage"]{${linkableDocumentFragment}},
  "practitioner": *[_type == "practitioner" && renderProviderPage != false]{${linkableDocumentFragment}}
}
`;

export const Sitemap = {
  get(): Promise<SitemapData | null> {
    return client.fetch(SITEMAP_DATA_QUERY);
  },
};
