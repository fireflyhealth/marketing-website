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
};
