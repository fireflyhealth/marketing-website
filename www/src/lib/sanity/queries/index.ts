import {
  metadataFragment,
  navigationFragment,
  navigationOverridesFragment,
} from './fragments';

export const siteSettingsFragment = `
  _id,
  _type,
  globalNav->{
    ${navigationFragment}
  },
  globalAnnouncementBanner{
    _type,
    body,
  },
  defaultMetadata {${metadataFragment}},
`;

export const specialPageFragment = `
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}},
`;

export const downloadPageFragment = `${specialPageFragment}`;

export const contactPageFragment = `${specialPageFragment}`;

export const notFoundPageFragment = `${specialPageFragment}`;

export const faqPageFragment = `${specialPageFragment}`;

export const clientPageFragment = `
  clientName,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}},
`;
