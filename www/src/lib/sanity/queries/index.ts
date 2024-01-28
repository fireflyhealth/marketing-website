import { metadataFragment, linkWithLabelFragment } from './fragments';

export const siteSettingsFragment = `
  _id,
  _type,
  globalNav->{
    _type,
    title,
    "navGroup": navGroup {${linkWithLabelFragment}}[],
  },
  globalAnnouncementBanner,
  defaultMetadata {${metadataFragment}},
`;
