export const SANITY_API_VERSION = '2024-01-01';

// TODO: update production url to staging url until site is launched

export const BASE_URL =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:3000'
    : 'https://firefly-health-website.vercel.app/';

export const PREVIEW_BASE_URL = `${BASE_URL}/previews`;
