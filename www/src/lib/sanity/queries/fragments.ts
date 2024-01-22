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

export const linkableDocumentFragment = `{
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
  },
}`;

export const metadataFragment = `{
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
}`;
