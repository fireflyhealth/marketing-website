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
  },
`;

export const hubspotFormFragment = `
  _type,
  formId,
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
      ${richTextFragmentNoLink}
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
  },
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

export const contentBlockHeaderFragment = `
  _type,
  title,
  description[]{
    ${richTextFragment}
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
  },
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

export const quoteObjectFragment = `
  _type,
  quote,
  attribution->{${linkableDocumentFragment}}
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

export const contentBlockFragment = `
  _type,
  _key,
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
    header{${contentBlockHeaderFragment}},
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
        ${richTextFragment}
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
  }
`;

export const videoHeaderFragment = `
  eyebrow,
  heading,
  body[]{
    ${richTextFragment}
  },
  video {${videoFragment}}
`;

export const textHeaderFragment = `
  eyebrow,
  heading,
  body[]{
    ${richTextFragment}
  },
  theme,
  cta {${ctaFragment}},
  gradientBackground,
`;

export const headerBlockFragment = `
  _type,
  _key,
  _type == "videoHeader" => {${videoHeaderFragment}},
  _type == "textHeader" => {${textHeaderFragment}},
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
  showNavCTA,
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
