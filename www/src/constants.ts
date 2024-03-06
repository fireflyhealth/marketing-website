import { config } from './config';

const StagingRevalidationTime = {
  Always: 1,
  Often: 1,
  Medium: 1,
  Rare: 1,
};

const ProdRevalidationTime = {
  Always: 1, // as often as possible
  Often: 300, // 5 minutes
  Medium: 3600, // 1 hour
  Rare: 21600, // 6 hours
};

export const RevalidationTime = config.isProd
  ? ProdRevalidationTime
  : StagingRevalidationTime;

export const carouselThreshold = 25;
