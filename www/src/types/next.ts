import { NextPage } from 'next';
import { SiteSettings, NavigationOverrides } from './sanity';

/**
 * All Page Route props should include siteSettings and other
 * global data
 */
export type PageProps = {
  siteSettings: SiteSettings;
  navigationOverrides?: NavigationOverrides | null;
};

export type PageRoute<T extends PageProps> = NextPage<T>;
