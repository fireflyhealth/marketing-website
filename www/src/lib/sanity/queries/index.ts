import { metadataFragment, linkWithLabelFragment } from './fragments';

export const siteSettings = `{
  _id,
  _type,
  "globalNav": globalNav->{
    _type,
    title,
    "navGroup": navGroup {${linkWithLabelFragment}}[],
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
