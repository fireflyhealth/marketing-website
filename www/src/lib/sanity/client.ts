import { createClient } from '@sanity-typed/client';

import { AllSanityTypes } from '@/types/sanity';

const client = createClient<AllSanityTypes>()({
  projectId: 'xgbrv2vi',
  dataset: 'production',
});

export const Sanity = {
  homepage: {
    get: () => client.fetch(`*[_type == "homepage" && _id == "homepage"][0]`),
  },
  page: {
    get: (slug: string) =>
      client.fetch(`*[_type == "genericPage" && slug.current == $slug][0]`, {
        slug,
      }),
    getSlugs: () => client.fetch(`*[_type == "genericPage"]{ slug }`),
  },
};
