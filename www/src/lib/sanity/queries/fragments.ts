<<<<<<< HEAD
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

export const linkWithLabelFragment = `
  _type == 'linkWithLabel' => {
    _type,
    _key,
    label,
    link->{
      "slug": slug.current,
    },
  },
  _type == 'labelWithDropdown' => {
    _type,
    _key,
    label,
    subpages {
      _type,
      _key,
      label,
      link->{
        "slug": slug.current,
      },
    }[],
  },
`;

export const linkableDocumentFragment = `
  _key,
  _type,
  page->{
    title,
    "slug": slug.current,
    subPages[]->{
      _type,
      _id,
      title,
      "slug": slug.current,
    },
  }`;

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
  }`;
