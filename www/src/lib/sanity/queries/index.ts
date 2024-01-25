import { metadataFragment, navGroupFragment } from './fragments';

export const siteSettingsFragment = `
  _id,
  _type,
  globalNav->{
    _type,
    title,
    "navGroup": navGroup {
      ${navGroupFragment}
    }[],
  },
  globalAnnouncementBanner{
    _type,
    body,
  },
  defaultMetadata {${metadataFragment}},
`;
