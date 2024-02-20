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
  header {${headerBlockFragment}}[],
  content {${contentBlockFragment}}[],
  metadataFragment{${metadataFragment}}
`;

export const downloadPageFragment = `${pageFragment}`;

export const contactPageFragment = `${pageFragment}`;

export const notFoundPageFragment = `${pageFragment}`;

export const faqPageFragment = `${pageFragment}`;

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
