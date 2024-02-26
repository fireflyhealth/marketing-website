import {
  metadataFragment,
  navigationFragment,
  navigationOverridesFragment,
  headerBlockFragment,
  contentBlockFragment,
  footerFragment,
  doubleCtaFragment,
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
  globalDoubleCta{${doubleCtaFragment}},
  footer {
    ${footerFragment}
  },
  defaultMetadata {${metadataFragment}}
`;

export const pageFragment = `
  _id,
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  'header': header[] {${headerBlockFragment}}[0],
  subnav,
  content {${contentBlockFragment}}[],
  metadataFragment{${metadataFragment}}
`;

export const specialPageFragment = `
  _id,
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  'header': header[] {${headerBlockFragment}}[0],
  content {${contentBlockFragment}}[],
  metadataFragment{${metadataFragment}}
`;

export const downloadPageFragment = `${specialPageFragment}`;

export const contactPageFragment = `${specialPageFragment}`;

export const notFoundPageFragment = `${specialPageFragment}`;

export const faqPageFragment = `${specialPageFragment}`;

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
