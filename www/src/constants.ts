import { isStaticBuild } from './config';

const StaticBuildRevalidationTime = {
  /* When making a static build, we cannot use the
   * 'revalidate' option on our pages. This will disable
   * them when making a build with STATIC_EXPORT=1 */
  Always: undefined,
  Often: undefined,
  Medium: undefined,
  Rare: undefined,
};

export const RevalidationTime = isStaticBuild
  ? StaticBuildRevalidationTime
  : {
      Always: 1, // as often as possible
      Often: 1, // as often as possible
      Medium: 1, // as often as possible
      Rare: 1, // as often as possible
    };

export const carouselThreshold = 25;

export const PAGINATION_PAGE_SIZE = 12;

export const DESKTOP_NAV_HEIGHT = 82;
export const TABLET_NAV_HEIGHT = 73;
export const MOBILE_NAV_HEIGHT = 64;

export const BREAK_POINTS_SM = 600;
export const BREAK_POINTS_MD = 800;
export const BREAK_POINTS_LG = 1200;

export enum Status {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
}
