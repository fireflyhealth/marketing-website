import { createClient } from '@sanity/client';
import { GenericPage, Homepage, SubPage } from '@/types/sanity';

const client = createClient({
  projectId: 'xgbrv2vi',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'development' ? false : true,
});

export const Sanity = {
  homepage: {
    get: (): Promise<Homepage> =>
      client.fetch(`*[_type == "homepage" && _id == "homepage"][0]`),
  },
  page: {
    get: (slug: string): Promise<GenericPage | null> =>
      client.fetch(`*[_type == "genericPage" && slug.current == $slug][0]`, {
        slug,
      }),
    getSlugInfo: (): Promise<GenericPage[]> =>
      client.fetch(`*[_type == "genericPage"]{
        slug,
        subPages[]->{ slug }
      }`),
  },
  subPage: {
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
  },
};
