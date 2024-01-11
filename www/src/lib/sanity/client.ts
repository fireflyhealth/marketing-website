import { createClient } from '@sanity/client';
import { GenericPage, Homepage } from '@/types/sanity';

const client = createClient({
  projectId: 'xgbrv2vi',
  dataset: 'production',
  apiVersion: '2024-01',
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
};
