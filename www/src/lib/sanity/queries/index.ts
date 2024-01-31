import {
  metadataFragment,
  navigationFragment,
  navigationOverridesFragment,
} from './fragments';

export const siteSettingsFragment = `
  _id,
  _type,
  globalNav->{
    ${navigationFragment}
  },
  globalAnnouncementBanner{
    _type,
    body,
  },
  defaultMetadata {${metadataFragment}}
`;

export const genericPageFragment = `
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}}
`;

export const subPageFragment = `
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}},
  meta
`;

export const specialPageFragment = `
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}}
`;

export const downloadPageFragment = `${specialPageFragment}`;

export const contactPageFragment = `${specialPageFragment}`;

export const notFoundPageFragment = `${specialPageFragment}`;

export const faqPageFragment = `${specialPageFragment}`;

export const clientPageFragment = `
  clientName,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}}
`;

export const blogFragment = `
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}}
`;

export const blogArticleFragment = `
  title,
  category->{
    _type,
    title,
    slug
  },
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}}
`;
