import { createClient } from '@sanity/client';
import {
  ContactPage,
  DownloadPage,
  FAQPage,
  GenericPage,
  Homepage,
  NotFoundPage,
  PressKitPage,
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

export const pressKitPage = {
  get: (): Promise<PressKitPage | null> =>
    client.fetch(`*[_type == "pressKitPage" && _id == "pressKitPage"][0]`),
};

export const faqPage = {
  get: (): Promise<FAQPage | null> =>
    client.fetch(`*[_type == "faqPage" && _id == "faqPage"][0]`),
};
