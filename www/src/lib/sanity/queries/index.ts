import { metadata } from './metadata';
import { linkableDocument } from './linkableDocument';

export const siteSettings = `{
  _id,
  _type,
  "globalNav": globalNav->{
    _type,
    title,
    "navLinks": navLinks ${linkableDocument}[],
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
  "defaultMetadata": defaultMetadata ${metadata},
}`;
