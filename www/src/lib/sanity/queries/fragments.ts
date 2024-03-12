/* Works for both RichImage and standard images */

export const imageFragment = `
  ...,
  asset -> {
    _id,
    _type,
    url,
    metadata {
      lqip,
      dimensions {
        aspectRatio,
        width,
        height
      }
    }
  }
`;

export const responsiveImageSetFragment = `
  desktop {
    ${imageFragment}
  },
  tablet{
    ${imageFragment}
  },
  mobile{
    ${imageFragment}
  }
`;

export const hubspotFormFragment = `
  ...
`;

export const barGraphFragment = `
  ...
`;

export const twoColumnUnorderedListFragment = `
  ...,
  listItems[]
`;

export const overlapDoubleImages = `
  ...,
  images[] {
    _key,
    ${imageFragment}
  }
`;

/* It's necessary to have this additional fragment because
 * we fetch rich text within the linkableDocumentFragment,
 * which is included in the other richTextFragment -
 * having this extra one prevents the two fragments from
 * being recursively dependent on each other */
export const richTextFragmentNoLink = `
  ...,
  _type == "richImage" => {
    ${imageFragment}
  },
  _type == "form" => {${hubspotFormFragment}},
  _type == "barGraphObject" => {
    ${barGraphFragment}
  },
  _type == "twoColumnUnorderedList" => {
    ${twoColumnUnorderedListFragment}
  },
  markDefs[]{
    _key,
    _type,
  }
`;

export const simpleRichTextFragmentNoLink = `
  ...,
`;

export const blogArticleLinkDataFragment = `
  _updatedAt,
  _type,
  _id,
  slug,
  title,
  publishDate,
  thumbnail{
    ${imageFragment}
  },
  blurb[]{
    ${simpleRichTextFragmentNoLink}
  },
  category->{
    _type,
    slug,
    title
  }
`;

/* Fetches the fields needed to create URLs for documents
 * based on the _type. See the LinkableDocument type
 * in @types/sanity
 *
 * Make sure this fragment is used with an expanded reference, i.e.:
 * documentLink->{
 *   ${linkableDocumentFragment}
 * }
 *
 * not:
 *            👇 missing arrow
 * documentLink {
 *   ${linkableDocumentFragment}
 * }
 **/
export const linkableDocumentFragment = `
  _id,
  _createdAt,
  _updatedAt,
  _type,
  _type == "homepage" => {},
  _type == "downloadPage" => {},
  _type == "contactPage" => {},
  _type == "faqPage" => {},
  _type == "genericPage" => {
    slug,
    title
  },
  _type == "blog" => {
    slug,
    title
  },
  _type == "blogArticle" => {
    ${blogArticleLinkDataFragment}
  },
  _type == "clientPage" => {
    slug,
    clientName
  },
  _type == "subPage" => {
    slug,
    title,
    "parentPage": *[
      _type == "genericPage"
      && ^._id in subPages[]._ref
    ]{
      _type,
      title,
      slug,
    }[0]
  },
  _type == "practitioner" => {
    name,
    slug,
    qualifications,
    title,
    pronouns,
    headshot {
      ${imageFragment}
    },
    blurb[]{
      ${simpleRichTextFragmentNoLink}
    }
  }
`;

export const linkFragment = `
  ...,
  file{
    asset->
  },
  documentLink->{
    ${linkableDocumentFragment}
  }
 `;

export const simpleRichTextFragment = `
  ...,
  markDefs[]{
    _key,
    _type,
    _type == "link" => {
      link {
        ${linkFragment}
      }
    },
  }
`;

export const ctaFragment = `
  ...,
  link{
    ${linkFragment}
  }
`;

export const linkWithLabelFragment = `
  ...,
  link {
    ${linkFragment}
  }
`;

const bigNumberFragment = `
  ...,
  description[]{
    ${simpleRichTextFragment}
  }
`;

export const bigNumbersFragment = `
  _type,
  bigNumbers[]{
    ${bigNumberFragment}
  },
  citation[]{
    ${simpleRichTextFragment}
  }
`;

export const contentBlockRichTextFragment = `
  ...,
  _type == "richImage" => {
    ${imageFragment}
  },
  _type == "barGraphObject" => {
    ${barGraphFragment}
  },
  _type == "bigNumbers" => {
    ${bigNumbersFragment}
  },
  _type == "twoColumnUnorderedList" => {
    ${twoColumnUnorderedListFragment}
  },
  _type == "richTextCtaRow" => {
    ctas[]{
      _key,
      ${ctaFragment}
    }
  },
  markDefs[]{
    _key,
    _type,
    _type == "link" => {
      link {
        ${linkFragment}
      }
    },
  }
`;

export const videoFragment = `
  ...,
  posterImage {
    ${imageFragment}
  }
`;

export const limitedRichTextFragment = `
  ...,
  _type == "barGraphObject" => {
    ${barGraphFragment}
  },
  _type == "bigNumbers" => {
    ${bigNumbersFragment}
  },
  _type == "richTextCtaRow" => {
    ctas[]{
      _key,
      ${ctaFragment}
    }
  },
  _type == "richImage" => {
    ${imageFragment}
  },
  markDefs[]{
    _key,
    _type,
    _type == "link" => {
      link {
        ${linkFragment}
      }
    },
  }
`;

export const quoteObjectFragment = `
  ...,
  badgeImage {
    ${imageFragment}
  },
  attribution {
   label,
    labelSubtitle,
    image {
      ${imageFragment}
    }
  }
`;

/* Make sure the parent property includes the brackets, i.e.
 *
 * content[]{
 *   ${richTextFragment}
 * }
 */
export const richTextFragment = `
  ...,
  _type == "richImage" => {
    ${imageFragment}
  },
  _type == "form" => {${hubspotFormFragment}},
  _type == "barGraphObject" => {
    ${barGraphFragment}
  },
  _type == "bigNumbers" => {
    ${bigNumbersFragment}
  },
  _type == "cta" => {${ctaFragment}},
  _type == "twoColumnUnorderedList" => {
    ${twoColumnUnorderedListFragment}
  },
  _type == "richTextCtaRow" => {
    ctas[]{
      _key,
      ${ctaFragment}
    }
  },
  _type == "bigOrderedList" => {
    listItems[] {
      title,
      description[]{
        ${simpleRichTextFragment}
      }
    }
  },
  _type == "overlapDoubleImages" => {
    ${overlapDoubleImages}
  },
  _type == "quoteObject" => {
    ${quoteObjectFragment}
  },
  _type == "video" => {
    ${videoFragment}
  },
  markDefs[]{
    _key,
    _type,
    _type == "link" => {
      link {
        ${linkFragment}
      }
    },
  }
`;

export const qrCodeObjectFragment = `
  _type,
  text,
  qrCodeImage {
    ${imageFragment}
  },
  storeLinks {
    appStoreLink {
      ${ctaFragment}
    },
    playStoreLink {
      ${ctaFragment}
    }
  }
`;

const ctaCardFragment = `
  ...,
  image {
    ${imageFragment}
  },
  cta {
    ${ctaFragment}
  }
`;

export const richTextChildBlockFragment = `
  ...,
  image {
    ${imageFragment}
  },
  body[]{
    ${limitedRichTextFragment}
  }
`;

export const headerContentFragment = `
  ...,
  eyebrowImage {
    ${imageFragment}
  },
  body[]{
    ${simpleRichTextFragment}
  },
  cta{
    ${ctaFragment}
  }
`;

export const headerQrCodeFragment = `
  heading,
  body[],
  qrCode {
    ${qrCodeObjectFragment}
  }
`;

/**
 * Child content blocks
 */
const childContentBlockFragment = `
  _type,
  _type == "richTextChildBlock" => {
    ${richTextChildBlockFragment}
  },
  _type == "ctaCard" => {
    ${ctaCardFragment}
  },
  _type == "imageChildBlock" => {
    image {
      ${imageFragment}
    }
  },
  _type == "bigNumber" => {
    ${bigNumberFragment}
  },
  _type == "bigNumbers" => {
    ${bigNumbersFragment}
  },
  _type == "quoteChildBlock" => {
    quote{
      ${quoteObjectFragment}
    }
  },
  _type == "videoChildBlock" => {
    video{
      ${videoFragment}
    }
  },
  _type == "headerContentChildBlock" => {
    ${headerContentFragment}
  },
  _type == "headerQrCodeChildBlock" => {
    ${headerQrCodeFragment}
  }
`;

/**
 * Main content blocks
 */
export const contentBlockHeaderFragment = `
  ...,
  description[]{
    ${simpleRichTextFragment}
  },
  cta {
    ${ctaFragment}
  }
`;

export const doubleCtaFragment = `
  _type,
  ctaOne{
    ...,
    link {
      ${linkFragment}
    },
  },
  ctaTwo{
    ...,
    link {
      ${linkFragment}
    },
  }
`;

const sequenceBlockTextFieldsFragment = `
  ...
`;

export const imageTextOverlapFragment = `
  image{
    ${imageFragment}
  },
  copy[]{
    ${contentBlockRichTextFragment}
  }
`;

export const quoteBlockFragment = `
  quoteObject{${quoteObjectFragment}},
  cta{${ctaFragment}}
`;

/**
 * blockOne and blockTwo are actually arrays
 * in Sanity, but validated to always have only
 * one item. The [0] is added to coerce these
 * into single objects in the result. */
const twoUpObjectFragment = `
  ...,
  blockOne {
    ${childContentBlockFragment}
  }[0],
  blockTwo {
    ${childContentBlockFragment}
  }[0]
`;

export const reviewFragment = `
  ...,
  review[]{${simpleRichTextFragment}},
  logo{${imageFragment}}
`;

export const reviewBlockFragmnet = `
  reviewHeading{
    _type,
    title,
    description[]{
      ${simpleRichTextFragment}
    }
  },
  reviews[]{${reviewFragment}}
`;

const twoUpBlockFragment = `
  ${twoUpObjectFragment}
`;

const richTextBlockFragment = `
  theme,
  richTextChildBlock {
    ${richTextChildBlockFragment}
  }
`;

export const faqFragment = `
  ...,
  subject->,
  category->,
  answer[]{
    ${simpleRichTextFragment}
  }
`;

const sequenceItemFragment = `
  ...,
  video{${videoFragment}},
  copy{${sequenceBlockTextFieldsFragment}}
`;

export const sequenceBlockFragment = `
  sequenceHeader{${sequenceBlockTextFieldsFragment}},
  sequenceItems[]{${sequenceItemFragment}},
  sequenceFooter
`;

export const columnsObjectFragment = `
  ...,
  content[]{${childContentBlockFragment}}
`;

const tabsBlockFragment = `
  tabs[]{
    ...,
    content[]{
      _type,
      _type == "twoUpObject" => {
        ${twoUpObjectFragment}
      },
      _type == "columnsObject" => {
        ${columnsObjectFragment}
      },
      _type == "contentBlockRichText" => {
        body[]{
          ${contentBlockRichTextFragment}
        }
      }
    }[0]
  }
`;

const faqBlockFragment = `
  ...,
  blockDescription[]{
    ${simpleRichTextFragment}
  },
  blockCta{
    ${ctaFragment}
  },
  faqs[]->{
    ${faqFragment}
  }
`;

const featuredStoriesBlockFragment = `
  stories[]->{
    ${linkableDocumentFragment}
  }
`;

export const subnavItemFragment = `
  ...
`;

export const drawerListItem = `
  ...,
  body[]{
    ${simpleRichTextFragment}
  },
  ctaLink{
    ${linkWithLabelFragment}
  },
  featuredImage{
    ${imageFragment}
  },
  backgroundImage{
    ${responsiveImageSetFragment}
  }
`;

export const imageGridBlockFragment = `
  theme,
  images[]{
    ${imageFragment}
  }
`;

export const cardlistBlockFragment = `
  drawerListItems[]{${drawerListItem}}
`;

const imageBlockFragment = `
  image {
    ${imageFragment}
  }
`;

const imageCarouselBlockFragment = `
  images[]{
    ${imageFragment}
  }
`;

const ctaCardsBlockFragment = `
  ctaCards[]{
    ...,
    image {
      ${imageFragment}
    },
    cta {
      ${ctaFragment}
    }
  }
`;

const doubleCtaBlockFragment = `
  _type,
  doubleCta{${doubleCtaFragment}},
`;

const practitionersBlockFragment = `
  practitioners[]->{
    ${linkableDocumentFragment}
  }
`;

const drawerListBlockFragment = `
  drawerListItems[]{${drawerListItem}}
`;

export const testimonialItemFragment = `
  ...,
  image{${imageFragment}},
  testimonial[]{${simpleRichTextFragment}},
  description[]{${simpleRichTextFragment}}
`;

export const testimonialBlockFragment = `
  testimonials[]{${testimonialItemFragment}}
`;

export const dividerBlockFragment = `
  ...
`;

/* Please keep this alphabetized! */
export const contentBlockFragment = `
  _type,
  _key,
  subnav {${subnavItemFragment}},
  header{${contentBlockHeaderFragment}},
  _type == "cardListBlock" => {${cardlistBlockFragment}},
  _type == "columnsBlock" => {${columnsObjectFragment}},
  _type == "ctaCardsBlock" => {${ctaCardsBlockFragment}},
  _type == "dividerBlock" => {${dividerBlockFragment}},
  _type == "doubleCtaBlock" => {${doubleCtaBlockFragment}},
  _type == "drawerListBlock" => {${drawerListBlockFragment}},
  _type == "faqBlock" => {${faqBlockFragment}},
  _type == "featuredStoriesBlock" => {${featuredStoriesBlockFragment}},
  _type == "imageBlock" => {${imageBlockFragment}},
  _type == "imageCarouselBlock" => {${imageCarouselBlockFragment}},
  _type == "imageGridBlock" => {${imageGridBlockFragment}},
  _type == "imageTextOverlapBlock" => {${imageTextOverlapFragment}},
  _type == "practitionersBlock" => {${practitionersBlockFragment}},
  _type == "quoteBlock" => {${quoteBlockFragment}},
  _type == "reviewBlock" => {${reviewBlockFragmnet}},
  _type == "richTextBlock" => {${richTextBlockFragment}},
  _type == "sequenceBlock" => {${sequenceBlockFragment}},
  _type == "tabsBlock" => {${tabsBlockFragment}},
  _type == "testimonialBlock" => {${testimonialBlockFragment}},
  _type == "twoUpBlock" => {${twoUpBlockFragment}}
`;

export const videoHeaderFragment = `
  ...,
  video{${videoFragment}},
  body[]{
    ${simpleRichTextFragment}
  }
`;

export const textHeaderFragment = `
  ...,
  body[]{
    ${simpleRichTextFragment}
  },
  ctas[]{
    ${ctaFragment}
  }
`;

const dualCtaHeaderCtaFragment = `
  ...,
  image {
    ${responsiveImageSetFragment}
  },
  link {
    ${linkFragment}
  }
`;

export const textWithDualCtaHeaderFragment = `
  ...,
  body[]{
    ${simpleRichTextFragment}
  },
  ctas[]{
    ${ctaFragment}
  },
  topCta {
    ${dualCtaHeaderCtaFragment}
  },
  bottomCta {
    ${dualCtaHeaderCtaFragment}
  }
`;

export const simpleTextHeaderFragment = `
  ...
`;

const twoUpHeaderFragment = `
  ${twoUpObjectFragment}
`;

export const headerBlockFragment = `
  _type,
  _key,
  _type == "videoHeader" => {${videoHeaderFragment}},
  _type == "textHeader" => {${textHeaderFragment}},
  _type == "textWithDualCtaHeader" => {${textWithDualCtaHeaderFragment}},
  _type == "simpleTextHeader" => {${simpleTextHeaderFragment}},
  _type == "twoUpHeader" => {${twoUpHeaderFragment}}
`;

export const navGroupFragment = `
  _type,
  _key,
  _type == "linkWithLabel" => {
    label,
    link {
      ${linkFragment}
    }
  },
  _type == "labelWithDropdown" => {
    label,
    subpages {
      _type,
      _key,
      label,
      link->{
        ${linkableDocumentFragment}
      },
    }[],
  }
`;

export const navigationFragment = `
  _id,
  _type,
  navGroup {
    ${navGroupFragment}
  }[],
  showNavCTA
`;

export const footerFragment = `
  mobileCta {
    ${ctaFragment}
  },
  footerNavGroups[]{
    _key,
    navItems[]{
      ${linkWithLabelFragment}
    }
  },
  bottomLinks {
    leftLinks[]{
      ${linkWithLabelFragment}
    },
    rightLinks[]{
      ${linkWithLabelFragment}
    }
  }
`;

export const metadataFragment = `
  _type,
  title,
  shareTitle,
  description,
  shareDescription,
  shareGraphic {
    asset->{
      url
    }
  }
`;

export const navigationOverridesFragment = `
  _type,
  pageNavigation->{${navigationFragment}},
  announcementBanner{
    _type,
    text[]{
      ${simpleRichTextFragment}
    }
  },
`;
