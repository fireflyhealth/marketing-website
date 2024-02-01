import {
  metadataFragment,
  navigationFragment,
  navigationOverridesFragment,
  ctaFragment,
  linkWithLabelFragment,
  footerFragment,
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
  footer {
    ${footerFragment}
  },
  defaultMetadata {${metadataFragment}}
`;

export const genericPageFragment = `
  _id,
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}}
`;

export const subPageFragment = `
  _id,
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}},
  meta
`;

export const specialPageFragment = `
  _id,
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
  _id,
  clientName,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}}
`;

export const blogFragment = `
  _id,
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}}
`;

export const blogArticleFragment = `
  _id,
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
