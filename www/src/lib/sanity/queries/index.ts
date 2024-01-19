import { metadata } from './metadata';
import { NavLinkObject } from './navigation';

export const siteSettings = `{
  _id,
  _type,
  "globalNav": globalNav->{
    _type,
    title,
    "navLinks": navLinks ${NavLinkObject}[],
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
