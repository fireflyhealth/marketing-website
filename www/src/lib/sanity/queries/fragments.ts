/* Works for both RichImage and standard images */

export const imageFragment = `
  _type,
  _key,
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
  },
  caption,
  altText,
  crop,
  hotspot
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
  _type,
  formId
`;

export const barGraphFragment = `
  _type,
  _key,
  barOne{
    unit,
    description,
  },
  barTwo{
    unit,
    description,
  }
`;

export const twoColumnUnorderedListFragment = `
  _type,
  _key,
  listItems[]
`;

/* It's necessary to have this additional fragment because
 * we fetch rich text within the linkableDocumentFragment,
 * which is included in the other richTextFragment -
 * having this extra one prevents the two fragments from
 * being recursively dependent on each other */
export const richTextFragmentNoLink = `
  _key,
  _type,
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
  _key,
  _type,
  ...,
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
    slug,
    title,
    category->{
      _type,
      slug,
      title
    }
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
  _type,
  _key,
  externalUrl,
  file{
    asset->{
      _type,
      _id,
      originalFilename,
      url,
      extension,
      size
    }
  },
  documentLink->{
    ${linkableDocumentFragment}
  }
 `;

export const simpleRichTextFragment = `
  _key,
  _type,
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
  _type,
  label,
  ariaLabel,
  variant,
  id,
  link{
    ${linkFragment}
  }
`;

export const linkWithLabelFragment = `
  _type,
  _key,
  label,
  link {
    ${linkFragment}
  }
`;

export const bigNumbersFragment = `
  _type,
  bigNumbers[]{
    _key,
    _type,
    unit {
      unitValue,
      position
    },
    value,
    description[]{
      ${simpleRichTextFragment}
    }
  },
  citation[]{
    ${simpleRichTextFragment}
  }
`;

export const limitedRichTextFragment = `
  _key,
  _type,
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

/* Make sure the parent property includes the brackets, i.e.
 *
 * content[]{
 *   ${richTextFragment}
 * }
 */
export const richTextFragment = `
  _key,
  _type,
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
  _type,
  quote,
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

/**
 * Child content blocks
 */
const childContentBlockFragment = `
  _type,
  _type == "richTextChildBlock" => {
    heading,
    body[]{
      ${limitedRichTextFragment}
    }
  },
  _type == "imageChildBlock" => {
    image {
      ${imageFragment}
    }
  },
  _type == "bigNumbers" => {
    ${bigNumbersFragment}
  },
  _type == "quoteChildBlock" => {
    quote{
      ${quoteObjectFragment}
    }
  }
`;

/**
 * Main content blocks
 */
export const contentBlockHeaderFragment = `
  _type,
  title,
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
    eyebrow,
    label,
    id,
    ariaLabel,
    link {
      ${linkFragment}
    },
  },
  ctaTwo{
    eyebrow,
    label,
    id,
    ariaLabel,
    link {
      ${linkFragment}
    },
  }
`;

const sequenceBlockTextFieldsFragment = `
  _type,
  title,
  bellyButtonText,
  description
`;

export const imageTextOverlapFragment = `
  header{
    ${contentBlockHeaderFragment}
  },
  image{
    ${imageFragment}
  },
  copy[]{
    ${richTextFragment}
  }
`;

export const quoteBlockFragment = `
  header{${contentBlockHeaderFragment}},
  quoteObject{${quoteObjectFragment}},
  cta{${ctaFragment}}
`;

export const videoFragment = `
  _type,
  videoLink,
  posterImage {
    ${imageFragment}
  }
`;

/**
 * blockOne and blockTwo are actually arrays
 * in Sanity, but validated to always have only
 * one item. The [0] is added to coerce these
 * into single objects in the result. */
const twoUpBlockFragment = `
  header {
    ${contentBlockHeaderFragment}
  },
  layout,
  mobileReverseBlockOrder,
  blockThemes {
    blockOneTheme,
    blockTwoTheme
  },
  blockOne {
    ${childContentBlockFragment}
  }[0],
  blockTwo {
    ${childContentBlockFragment}
  }[0]
`;

export const reviewFragment = `
  _type,
  _key,
  starRating,
  title,
  review[]{${simpleRichTextFragment}},
  reviewer{
    name,
    age,
  },
  date,
  logo{${imageFragment}}
`;

export const reviewBlockFragmnet = `
  header{${contentBlockHeaderFragment}},
  reviewHeading{
    _type,
    title,
    description[]{
      ${simpleRichTextFragment}
    }
  },
  reviews[]{${reviewFragment}}
`;

const sequenceItemFragment = `
  _type,
  _key,
  video{${videoFragment}},
  copy{${sequenceBlockTextFieldsFragment}},
  theme,
  isHighlighted
`;

export const sequenceBlockFragment = `
  header{${contentBlockHeaderFragment}},
  sequenceHeader{${sequenceBlockTextFieldsFragment}},
  sequenceItems[]{${sequenceItemFragment}},
  sequenceFooter
`;

export const subnavItemFragment = `
  label,
  contentBlockId,
  ariaLabel
`;

export const imageGridBlockFragment = `
  header{${contentBlockHeaderFragment}},
  theme,
  images[]{
    ${imageFragment}
  }
`;

export const contentBlockFragment = `
  _type,
  _key,
  id,
  subnav {${subnavItemFragment}},
  _type == "imageBlock" => {
    header {
      ${contentBlockHeaderFragment}
    },
    image {
      ${imageFragment}
    }
  },
  _type == "imageCarouselBlock" => {
    header {
      ${contentBlockHeaderFragment}
    },
    images[]{
      ${imageFragment}
    }
  },
  _type == "ctaCardsBlock" => {
    header {
      ${contentBlockHeaderFragment}
    },
    ctaCards[]{
      _type,
      _key,
      image {
        ${imageFragment}
      },
      title,
      cta {
        ${ctaFragment}
      }
    }
  },
  _type == "doubleCtaBlock" => {
    _type,
    doubleCta{${doubleCtaFragment}},
    header{${contentBlockHeaderFragment}}
  },
  _type == "practitionersBlock" => {
    header {
      ${contentBlockHeaderFragment}
    },
    practitioners[]->{
      ${linkableDocumentFragment}
    }
  },
  _type == "imageTextOverlapBlock" => {${imageTextOverlapFragment}},
  _type == "quoteBlock" => {${quoteBlockFragment}},
  _type == "drawerListBlock" => {
    header {
      ${contentBlockHeaderFragment}
    },
    drawerListItems[]{
      _key,
      _type,
      title,
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
      },
      theme
     }
   },
  _type == "sequenceBlock" => {${sequenceBlockFragment}},
  _type == "twoUpBlock" => {${twoUpBlockFragment}},
  _type == "reviewBlock" => {${reviewBlockFragmnet}},
  _type == "sequenceBlock" => {${sequenceBlockFragment}},
  _type == "imageGridBlock" => {${imageGridBlockFragment}},
  _type == "sequenceBlock" => {${sequenceBlockFragment}},
  _type == "faqBlock" => {
    header {
      ${contentBlockHeaderFragment}
    },
    theme,
    blockTitle,
    blockDescription[]{
      ${simpleRichTextFragment}
    },
    blockCta{
      ${ctaFragment}
    },
    faqs[]->{
      _id,
      _type,
      question,
      answer[]{
        ${simpleRichTextFragment}
      }
    }
  }
`;

export const videoHeaderFragment = `
  eyebrow,
  heading,
  video{${videoFragment}},
  body[]{
    ${simpleRichTextFragment}
  }
`;

export const textHeaderFragment = `
  eyebrow,
  heading,
  body[]{
    ${richTextFragment}
  },
  theme,
  ctas[]{
    ${ctaFragment}
  },
  gradientBackground
`;

const dualCtaHeaderCtaFragment = `
  image {
    ${responsiveImageSetFragment}
  },
  eyebrow,
  label,
  id,
  ariaLabel,
  link {
    ${linkFragment}
  },
  theme
`;

export const textWithDualCtaHeaderFragment = `
  eyebrow,
  heading,
  body[]{
    ${richTextFragment}
  },
  theme,
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

export const headerBlockFragment = `
  _type,
  _key,
  _type == "videoHeader" => {${videoHeaderFragment}},
  _type == "textHeader" => {${textHeaderFragment}},
  _type == "textWithDualCtaHeader" => {${textWithDualCtaHeaderFragment}},
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
    body,
  },
  `;
