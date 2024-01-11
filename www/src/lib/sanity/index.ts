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
  NotFoundPage,
  SubPage,
} from '@/types/sanity';

const client = createClient({
  projectId: 'xgbrv2vi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'development' ? false : true,
});

/* Homepage */
export const homepage = {
  get: (): Promise<Homepage> =>
    client.fetch(`*[_type == "homepage" && _id == "homepage"][0]`),
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
    client.fetch(`*[_type == "blog"]{
    slug,
    articles[]->{
      slug
    }
  }`),
  getArticle: async (
    blogSlug: string,
    articleSlug: string,
  ): Promise<BlogArticle | null> => {
    const article = await client.fetch(
      `*[
          _type == "blogArticle"
          && slug.current == $articleSlug
        ]{
          ...,
          "parentBlog": *[
           ^._id in articles[]._ref
            && _type == "blog"
             && slug.current == $blogSlug
          ] {
            slug,
          }[0]
        }[parentBlog != null][0]`,
      { blogSlug, articleSlug },
    );
    return article || null;
  },
};
