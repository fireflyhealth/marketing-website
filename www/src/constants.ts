import { config } from './config';

const StagingRevalidationTime = {
  Always: 1,
  Often: 1,
  Medium: 1,
  Rare: 1,
};

const ProdRevalidationTime = {
  Always: 1, // as often as possible
  Often: 1, // as often as possible
  Medium: 1, // as often as possible
  Rare: 1, // as often as possible
};

export const RevalidationTime = config.isProd
  ? ProdRevalidationTime
  : StagingRevalidationTime;

export const carouselThreshold = 25;

export const PAGINATION_PAGE_SIZE = 12;

export enum Status {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
}
