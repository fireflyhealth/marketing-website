import {
  metadataFragment,
  navigationFragment,
  navigationOverridesFragment,
  headerBlockFragment,
  contentBlockFragment,
  footerFragment,
  doubleCtaFragment,
  responsiveImageSetFragment,
  blogArticleLinkDataFragment,
  faqFragment,
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

/**
 * Fields included in both generic pages and
 * special pages. (I.e. this does not include 'subnav',
 * that does not exist on the FAQ page)
 */
const pageSharedFieldsFragment = `
  navigationOverrides {${navigationOverridesFragment}},
  'header': header[] {${headerBlockFragment}}[0]
`;

export const pageFragment = `
  _id,
  title,
  slug,
  ${pageSharedFieldsFragment},
  subnav,
  content {${contentBlockFragment}}[],
  metadataFragment{${metadataFragment}}
`;

export const specialPageFragment = `
  _id,
  title,
  slug,
  ${pageSharedFieldsFragment},
  content {${contentBlockFragment}}[],
  metadataFragment{${metadataFragment}}
`;

export const downloadPageFragment = `${specialPageFragment}`;

export const contactPageFragment = `${specialPageFragment}`;

export const notFoundPageFragment = `
  ${specialPageFragment},
  decorativeImage{${responsiveImageSetFragment}}
`;

export const faqPageFragment = `
  _id,
  _type,
  title,
  slug,
  metadataFragment{${metadataFragment}},
  title,
  faqTabs[]{
    _key,
    title,
    faqGroups[]{
      _key,
      title,
      questions[]->{
        ${faqFragment}
      }
    }
  }
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

export const blogFragment = `
  _id,
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  'header': header[] {${headerBlockFragment}}[0],
  metadataFragment{${metadataFragment}},
  'articles': *[_type == "blogArticle" && category->_id == ^._id]{
    ${blogArticleLinkDataFragment}
  },
  featuredArticle->{
    ${blogArticleLinkDataFragment}
  },
  contentArea[]{
    ${contentBlockFragment}
  },
  allArticlesLabel,
  blogArticleTagGroups[]{
    _type,
    _key,
    title,
    tag->{
      title,
      slug
    }
  },
  articleLayout
`;
