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

export const downloadPageFragment = `
  title,
  slug,
  navigationOverrides {${navigationOverridesFragment}},
  metadataFragment{${metadataFragment}},
`;
