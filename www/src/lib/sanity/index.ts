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

const client = createClient({
  projectId: 'xgbrv2vi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'development' ? false : true,
});

const builder = ImageUrlBuilder(client);

export const imageBuilder = {
  image: (image: Image | RichImage) => {
    return builder.image(image);
  },
};

/* Site Settings & Navigation */

export const siteSettings = {
  get: async (): Promise<SiteSettings> => {
    const siteSettings = await client.fetch<SiteSettings | null>(
      `*[_type == "siteSettings" && _id == "siteSettings"][0]{
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
      `*[_type == "homepage" && _id == "homepage"][0]`,
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
    client.fetch(`*[_type == "genericPage" && slug.current == $slug][0]`, {
      slug,
    }),
  getSlugInfo: (): Promise<GenericPage[]> =>
    client.fetch(`*[_type == "genericPage"]{
        slug,
        navigationOverrides {
          announcementBanner,
        },
        subPages[]->{ slug }
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
            ...,
            "parentPage": *[
              _type == "genericPage"
              && slug.current == $parentSlug
              && ^._id in subPages[]._ref
            ] {
              slug,
            }[0]
          }[parentPage != null][0]`,

      { parentSlug, subpageSlug },
    );
    return subpage || null;
  },
};

/* Special pages */
export const downloadPage = {
  get: (): Promise<DownloadPage | null> =>
    client.fetch(`*[_type == "downloadPage" && _id == "downloadPage"][0]`),
};

export const contactPage = {
  get: (): Promise<ContactPage | null> =>
    client.fetch(`*[_type == "contactPage" && _id == "contactPage"][0]`),
};

export const notFoundPage = {
  get: (): Promise<NotFoundPage | null> =>
    client.fetch(`*[_type == "notFoundPage" && _id == "notFoundPage"][0]`),
};

export const faqPage = {
  get: (): Promise<FAQPage | null> =>
    client.fetch(`*[_type == "faqPage" && _id == "faqPage"][0]`),
};

/* Client Page */
export const clientPage = {
  get: (clientSlug: string): Promise<ClientPage | null> =>
    client.fetch(`*[_type == "clientPage" && slug.current == $clientSlug][0]`, {
      clientSlug,
    }),
  getSlugInfo: (): Promise<GenericPage[]> =>
    client.fetch(`*[_type == "clientPage"]{
        slug,
      }`),
};
/* Blogs */
export const blog = {
  get: (blogSlug: string): Promise<Blog | null> =>
    client.fetch(`*[_type == "blog" && slug.current == $blogSlug][0]`, {
      blogSlug,
    }),
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
          ...,
          category->{
            _type,
            title,
            slug
          }
        }[category.slug.current == $blogSlug][0]`,
      { blogSlug, articleSlug },
    );
    return article || null;
  },
};
