export const SANITY_API_VERSION = '2024-01-01';

// TODO: update staging url to production url after launch

export const BASE_URL =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:3000'
    : 'http://firefly-health.vercel.app';
