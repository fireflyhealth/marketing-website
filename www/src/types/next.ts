import { SiteSettings } from './sanity';

/**
 * All Page Route props should include siteSettings and other
 * global data
 */
export type PageProps<T> = T & {
  siteSettings: SiteSettings;
};
