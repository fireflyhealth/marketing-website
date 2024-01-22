import { metadataFragment, linkableDocumentFragment } from './fragments';

export const siteSettings = `{
  _id,
  _type,
  "globalNav": globalNav->{
    _type,
    title,
    "navLinks": navLinks {${linkableDocumentFragment}}[],
  },
  logoColor {
    asset->{
      url
    }
  },
  logoMonochrome {
    asset->{
      url
    }
  },
  "defaultMetadata": defaultMetadata {${metadataFragment}},
}`;
