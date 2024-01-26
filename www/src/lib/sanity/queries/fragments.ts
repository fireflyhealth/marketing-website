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
  }
`;

export const linkFragment = `
  _type,
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

export const richTextFragment = `
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

export const navGroupFragment = `
  _type,
  _key,
  label,
  subpages {
    _type,
    _key,
    label,
    link->{
      ${linkableDocumentFragment}
    },
  }[],
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
  }`;
