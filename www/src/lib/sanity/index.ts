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
  practitionerPageFragment,
} from './queries';
import {
  blogArticleLinkDataFragment,
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
  get: async (): Promise<Homepage> => {
    const homepage = await client.fetch(
      `*[_type == "homepage" && _id == "${HOMEPAGE_DOCUMENT_ID}"][0] {${pageFragment}}`,
    );
    if (!homepage) {
      throw new Error('Could not fetch homepage');
    }
    return homepage;
  },
};

/* Generic Pages */
export const page = {
  get: (slug: string): Promise<GenericPage | null> =>
    client.fetch(
      `*[_type == "genericPage" && slug.current == $slug][0]{${pageFragment}}`,
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
            ${pageFragment},
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
};

/* Special pages */
export const downloadPage = {
  get: (): Promise<DownloadPage | null> =>
    client.fetch(
      `*[_type == "downloadPage" && _id == "${DOWNLOAD_DOCUMENT_ID}"][0]{${downloadPageFragment}}`,
    ),
};

export const contactPage = {
  get: (): Promise<ContactPage | null> =>
    client.fetch(
      `*[_type == "contactPage" && _id == "contactPage"][0]{${contactPageFragment}}`,
    ),
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
  get: (clientSlug: string): Promise<ClientPage | null> =>
    client.fetch(
      `*[_type == "clientPage" && slug.current == $clientSlug][0]{${pageFragment}}`,
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
      `*[_type == "blog" && slug.current == $blogSlug][0]{${blogFragment}}`,
      {
        blogSlug,
      },
    ),
  getSlugInfo: (): Promise<BlogWithArticles[]> =>
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
};

/* Practitioner Page */
export const practitionerPage = {
  get: (practitionerSlug: string): Promise<Practitioner | null> =>
    client.fetch(
      `*[_type == "practitioner" && slug.current == $practitionerSlug][0]{${practitionerPageFragment}}`,
      {
        practitionerSlug,
      },
    ),
  getSlugInfo: (): Promise<Practitioner[]> =>
    client.fetch(`*[_type == "practitioner"]{
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
  "practitioner": *[_type == "practitioner"]{${linkableDocumentFragment}}
}
`;

export const Sitemap = {
  get(): Promise<SitemapData | null> {
    return client.fetch(SITEMAP_DATA_QUERY);
  },
};
