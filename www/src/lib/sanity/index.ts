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
  GenericPageSlugInfo,
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
  ArticleSortOrder,
  ManuallySortedBlogArticlePagination,
} from '@/types/sanity';
import { PageParams } from '@/pages/[pageSlug]/[subpageSlug]';
import { PageParams as ArticlePageParams } from '@/pages/blog/[blogSlug]/[articleSlug]';
import { PAGINATION_PAGE_SIZE } from '@/constants';
import { config, isLocalCmsDataEnabled, isStaticBuild } from '@/config';

import sanityData from '@/lib/sanity/sanityData.json';

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
  generateStaticData?: boolean;
};

const shouldGetDataFromSanity = (config: QueryConfig) => {
  // if generateStaticData is true, we should get data from sanity even if it is static build.
  // this is used for generating static data
  if (!!config.generateStaticData) return true;

  // if static build is true and local cms data is enabled, we should not get data from sanity. We should use local CMS data.
  if (!!isStaticBuild && isLocalCmsDataEnabled) return false;

  return true;
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
  staticPageBData: T,
  params: Record<string, any> = {},
): Promise<T | null> => {
  if (!primaryDocument) return null;

  if (shouldGetDataFromSanity(config)) {
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
  } else {
    if (config.preferBContent) {
      return staticPageBData || primaryDocument;
    }
    return primaryDocument;
  }
};

/* Site Settings & Navigation */

export const siteSettings = {
  get: async (config: QueryConfig = {}): Promise<SiteSettings> => {
    const siteSettings = (await shouldGetDataFromSanity(config))
      ? client.fetch<SiteSettings | null>(
          `*[_type == "siteSettings" && _id == "${SITE_SETTINGS_DOCUMENT_ID}"][0]{
        ${siteSettingsFragment}
      }`,
        )
      : (sanityData?.siteSettings as unknown);

    return siteSettings as SiteSettings;
  },
};

/* Homepage */
export const homepage = {
  get: async (config: QueryConfig = {}): Promise<Homepage> => {
    const primaryHomepage = shouldGetDataFromSanity(config)
      ? await client.fetch<WithDocumentVariantInfo<Homepage> | null>(
          `*[
            _type == "homepage"
            && _id == "${HOMEPAGE_DOCUMENT_ID}"
            && ${isNotVariantFilter}
          ][0] {
          documentVariantInfo,
          ${pageFragment}
        }`,
        )
      : (sanityData?.homePage as unknown);
    const homepage = await withMaybeBContent(
      primaryHomepage,
      config,
      pageFragment,
      sanityData?.homeBPage as unknown,
    );

    return homepage as Homepage;
  },
};

/* Generic Pages */
export const page = {
  get: async (
    slug: string,
    config: QueryConfig = {},
  ): Promise<GenericPage | null> => {
    const staticGenericPages = sanityData?.genericPages as unknown as {
      [slug: string]: GenericPage;
    };

    const genericPage = shouldGetDataFromSanity(config)
      ? await client.fetch<WithDocumentVariantInfo<GenericPage> | null>(
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
        )
      : (staticGenericPages?.[slug] as unknown as GenericPage);

    return withMaybeBContent(
      genericPage,
      config,
      pageFragment,
      staticGenericPages?.[`${slug}-b-content`],
    );
  },
  getSlugInfo: async (
    config: QueryConfig = {},
  ): Promise<GenericPageSlugInfo> => {
    const slugInfo = shouldGetDataFromSanity(config)
      ? await client.fetch(`*[_type == "genericPage" && ${isNotVariantFilter}]{
        slug,
        subPages[]->{ slug },
      }`)
      : (sanityData?.genericPageSlugInfo as unknown);

    return slugInfo as GenericPageSlugInfo;
  },
};

export const subPage = {
  get: async (
    parentSlug: string,
    subpageSlug: string,
    config: QueryConfig = {},
  ): Promise<SubPage | null> => {
    const staticGenericSubPages = sanityData?.genericSubPages as unknown as {
      [pageSlug: string]: { [subpageSlug: string]: SubPage };
    };
    const params = { parentSlug, subpageSlug };
    const subPage = shouldGetDataFromSanity(config)
      ? await client.fetch<WithDocumentVariantInfo<SubPage> | null>(
          `*[_type == "subPage"
          && slug.current == $subpageSlug
          && ${isNotVariantFilter}
        ]{
          documentVariantInfo,
          ${subPageFragment},
       }[parentPage != null][0]`,
          params,
        )
      : staticGenericSubPages?.[parentSlug]?.[subpageSlug];

    return withMaybeBContent(
      subPage,
      config,
      subPageFragment,
      staticGenericSubPages?.[parentSlug]?.[`${subpageSlug}-b-content`],
      params,
    );
  },
  getSlugParams: (parentPages: GenericPageSlugInfo): PageParams[] =>
    parentPages.reduce<PageParams[]>((slugInfoArray, parentPage) => {
      const pageSlug = parentPage.slug.current;

      if (parentPage.subPages && parentPage.subPages.length > 0) {
        const subpageSlugs = parentPage.subPages.map(
          (subPage) => subPage.slug.current,
        );
        const subPageInfos = subpageSlugs.map((subpageSlug) => ({
          pageSlug,
          subpageSlug,
        }));
        return [...slugInfoArray, ...subPageInfos];
      } else {
        return slugInfoArray;
      }
    }, []),
};

/* Special pages */
export const downloadPage = {
  get: async (config: QueryConfig = {}): Promise<DownloadPage | null> => {
    const downloadPage = shouldGetDataFromSanity(config)
      ? await client.fetch<WithDocumentVariantInfo<DownloadPage> | null>(
          `*[
          _type == "downloadPage"
          && _id == "${DOWNLOAD_DOCUMENT_ID}"
          && ${isNotVariantFilter}
        ][0]{
          documentVariantInfo,
          ${downloadPageFragment}
        }`,
        )
      : (sanityData?.downloadPage as unknown as DownloadPage);

    return withMaybeBContent(
      downloadPage,
      config,
      downloadPageFragment,
      sanityData?.downloadBPage as unknown as DownloadPage,
    );
  },
};

export const contactPage = {
  get: async (config: QueryConfig = {}): Promise<ContactPage | null> => {
    const contactPage = shouldGetDataFromSanity(config)
      ? await client.fetch<WithDocumentVariantInfo<ContactPage> | null>(
          `*[
          _type == "contactPage"
          && _id == "contactPage"
          && ${isNotVariantFilter}
        ][0]{
          documentVariantInfo,
          ${contactPageFragment}
        }`,
        )
      : (sanityData.contactPage as unknown as ContactPage);

    return withMaybeBContent(
      contactPage,
      config,
      contactPageFragment,
      sanityData?.contactBPage as unknown as ContactPage,
    );
  },
};

export const notFoundPage = {
  get: async (config: QueryConfig = {}): Promise<NotFoundPage | null> => {
    const notFoundPage = shouldGetDataFromSanity(config)
      ? await client.fetch(
          `*[_type == "notFoundPage" && _id == "notFoundPage"][0]{${notFoundPageFragment}}`,
        )
      : (sanityData?.notFoundPage as unknown as NotFoundPage);

    return notFoundPage;
  },
};

export const faqPage = {
  get: async (config: QueryConfig = {}): Promise<FAQPage | null> => {
    const faqPage = shouldGetDataFromSanity(config)
      ? await client.fetch(
          `*[_type == "faqPage" && _id == "faqPage"][0]{${faqPageFragment}}`,
        )
      : (sanityData?.faqPage as unknown as FAQPage);

    return faqPage;
  },
};

/* Client Page */
export const clientPage = {
  get: async (
    clientSlug: string,
    config: QueryConfig = {},
  ): Promise<ClientPage | null> => {
    const clientPages = sanityData?.clientPages as unknown as {
      [slug: string]: ClientPage;
    };

    const clientPage = shouldGetDataFromSanity(config)
      ? await client.fetch<WithDocumentVariantInfo<ClientPage> | null>(
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
        )
      : clientPages[clientSlug];

    return withMaybeBContent(
      clientPage,
      config,
      pageFragment,
      clientPages?.[`${clientSlug}-b-content`],
    );
  },
  getSlugInfo: async (
    config: QueryConfig = {},
  ): Promise<GenericPageSlugInfo> => {
    const slugInfo = shouldGetDataFromSanity(config)
      ? await client.fetch(`*[_type == "clientPage" && ${isNotVariantFilter}]{
      slug,
    }`)
      : (sanityData.clientPageSlugInfo as unknown);

    return slugInfo as GenericPageSlugInfo;
  },
};

/* Blogs */

export const blog = {
  get: async (
    blogSlug: string,
    config: QueryConfig = {},
  ): Promise<Blog | null> => {
    const staticBlogPages = sanityData?.blogPages as unknown as {
      [slug: string]: Blog;
    };
    const blog = shouldGetDataFromSanity(config)
      ? await client.fetch<WithDocumentVariantInfo<Blog> | null>(
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
        )
      : staticBlogPages?.[blogSlug];

    return withMaybeBContent(
      blog,
      config,
      blogFragment,
      staticBlogPages?.[`${blogSlug}-b-content`],
    );
  },

  getSlugInfo: async (
    config: QueryConfig = {},
  ): Promise<BlogWithArticles[]> => {
    const slugInfo = shouldGetDataFromSanity(config)
      ? await client.fetch(
          `*[
          _type == "blog"
          && ${isNotVariantFilter}
       ]{
          slug,
          "articles": *[
            _type == "blogArticle"
            && category._ref == ^._id
            && ${isNotVariantFilter}
          ] {
            slug
          }
        }`,
        )
      : (sanityData?.blogPageSlugInfo as unknown);

    return slugInfo as BlogWithArticles[];
  },

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
  ] | order(_updatedAt desc) | order(publishDate desc) {
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

  getManuallySortedBlogArticles: async (
    blogSlug: string,
    page: number = 0,
  ): Promise<BlogArticlePagination> => {
    const from = page * PAGINATION_PAGE_SIZE;
    /* Overfetch by 1 to see if there are additional pages */
    const to = from + PAGINATION_PAGE_SIZE + 1;
    const articles = await client.fetch<Blog>(
      `*[
            _type == "blog"
            && slug.current == $blogSlug
            && ${isNotVariantFilter}
          ][0]{
            documentVariantInfo,
            manuallySortedArticleList[]->{
              ${blogArticleLinkDataFragment}
            }
          }[$from..$to]`,
      { blogSlug, from, to },
    );
    /* Slice off the possible over-fetched article */
    const slicedArticles = articles?.manuallySortedArticleList?.slice(
      0,
      PAGINATION_PAGE_SIZE,
    );
    return {
      page,
      hasNextPage:
        articles &&
        articles.manuallySortedArticleList &&
        articles.manuallySortedArticleList?.length > PAGINATION_PAGE_SIZE
          ? true
          : false,
      articles: slicedArticles ? slicedArticles : [],
    };
  },

  getSlugParams: (blogs: BlogWithArticles[]): ArticlePageParams[] => {
    const articlePageParams = blogs.reduce<ArticlePageParams[]>(
      (slugInfoArray, blog) => {
        const blogSlug = blog.slug.current;

        if (blog.articles && blog.articles.length > 0) {
          const articleSlugs = blog.articles.map(
            (article) => article.slug.current,
          );
          const articleInfos = articleSlugs.map((articleSlug) => ({
            blogSlug,
            articleSlug,
          }));
          return [...slugInfoArray, ...articleInfos];
        } else {
          return slugInfoArray;
        }
      },
      [],
    );

    return articlePageParams;
  },
  getArticle: async (
    blogSlug: string,
    articleSlug: string,
    config: QueryConfig = {},
  ): Promise<BlogArticle | null> => {
    const staticArticlePages = sanityData?.articlePages as unknown as {
      [blogSlug: string]: { [articleSlug: string]: BlogArticle };
    };
    const params = { blogSlug, articleSlug };
    const article = shouldGetDataFromSanity(config)
      ? await client.fetch<WithDocumentVariantInfo<BlogArticle> | null>(
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
        )
      : staticArticlePages?.[blogSlug]?.[articleSlug];

    return withMaybeBContent(
      article,
      config,
      blogArticleFragment,
      staticArticlePages?.[blogSlug]?.[`${articleSlug}-b-content`],
    );
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
    const staticProviderPages = sanityData?.providerPages as unknown as {
      [slug: string]: Practitioner;
    };
    const provider = shouldGetDataFromSanity(config)
      ? await client.fetch<WithDocumentVariantInfo<Practitioner> | null>(
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
        )
      : staticProviderPages?.[practitionerSlug];

    if (!provider) {
      console.warn(
        `Could not fetch ${practitionerSlug}. This is likely due to "render provider page" set to false on CMS. Please double check if this is intended decision.`,
      );
    }

    return withMaybeBContent(
      provider,
      config,
      providerPageFragment,
      staticProviderPages?.[`${practitionerSlug}-b-content`],
    );
  },
  getSlugInfo: async (config: QueryConfig = {}): Promise<Practitioner[]> => {
    const slugInfo = shouldGetDataFromSanity(config)
      ? await client.fetch(`*[_type == "practitioner" && ${isNotVariantFilter}]{
      slug,
      renderProviderPage,
    }`)
      : (sanityData?.providerPageSlugInfo as unknown);

    return slugInfo;
  },
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
  "homepage": *[_type == "homepage" && !(slug.current match "-b-content")][0]{${linkableDocumentFragment}},
  "faqPage": *[_type == "faqPage"][0]{${linkableDocumentFragment}},
  "contactPage": *[_type == "contactPage" && !(slug.current match "-b-content")][0]{${linkableDocumentFragment}},
  "downloadPage": *[_type == "downloadPage" && !(slug.current match "-b-content")][0]{${linkableDocumentFragment}},
  "genericPage": *[_type == "genericPage" && !(slug.current match "-b-content")]{${linkableDocumentFragment}},
  "subPage": *[_type == "subPage" && !(slug.current match "-b-content")]{${linkableDocumentFragment}},
  "blog": *[_type == "blog" && !(slug.current match "-b-content")]{${linkableDocumentFragment}},
  "blogArticle": *[_type == "blogArticle" && !(slug.current match "-b-content")]{${linkableDocumentFragment}},
  "clientPage": *[_type == "clientPage" && !(slug.current match "-b-content")]{${linkableDocumentFragment}},
  "practitioner": *[_type == "practitioner" && renderProviderPage != false && !(slug.current match "-b-content")]{${linkableDocumentFragment}}
}
`;

export const Sitemap = {
  get(): Promise<SitemapData | null> {
    return client.fetch(SITEMAP_DATA_QUERY);
  },
};
