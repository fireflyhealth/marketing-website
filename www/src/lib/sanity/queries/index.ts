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
  imageFragment,
  richTextFragment,
  simpleRichTextFragment,
} from './fragments';

export const siteSettingsFragment = `
  _id,
  _type,
  globalNav->{
    ${navigationFragment}
  },
  globalAnnouncementBanner{
    _type,
    text[]{
      ${simpleRichTextFragment}
    }
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
  metadata{${metadataFragment}}
`;

export const specialPageFragment = `
  _id,
  title,
  slug,
  ${pageSharedFieldsFragment},
  content {${contentBlockFragment}}[],
  metadata{${metadataFragment}}
`;

export const downloadPageFragment = `${specialPageFragment}`;

export const contactPageFragment = `
  _id,
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  pageTitle,
  pageDescription[]{${simpleRichTextFragment}},
  contactForm,
  backgroundColor,
  backgroundImage{${imageFragment}},
  metadata{${metadataFragment}}
`;

export const notFoundPageFragment = `
  ${specialPageFragment},
  decorativeImage{${responsiveImageSetFragment}}
`;

export const faqPageFragment = `
  _id,
  _type,
  title,
  slug,
  ${pageSharedFieldsFragment},
  metadata{${metadataFragment}},
  title,
  "faqs": *[_type == "faq"]{
    ${faqFragment}
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
  tags[]->{
    _type,
    title,
    slug
  },
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadata{${metadataFragment}},
  deck[]{${simpleRichTextFragment}},
  content[]{${richTextFragment}},
  articleImage {${imageFragment}},
  authorName,
  publishDate,
  updatedDate,
  _createdAt,
  _updatedAt
`;

export const blogFragment = `
  _id,
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  'header': header[] {${headerBlockFragment}}[0],
  metadata{${metadataFragment}},
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

export const practitionerPageFragment = `
  name,
  slug,
  qualifications,
  title,
  pronouns,
  headshot {
    ${imageFragment}
  },
  education[]{
    _type,
    name,
  },
  languagesSpoken,
  blurb,
  renderProviderPage,
  contentArea[]{
    ${contentBlockFragment}
  },
`;
