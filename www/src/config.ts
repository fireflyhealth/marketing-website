export const config = {
  /* Will be true only on production deployments */
  isProd: process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'production',
  metadata: {
    siteName: 'Firefly ',
    productionUrl: 'https://www.fireflyhealth.com',
    /* Final fallback. This will be overridden by the defaultMetadata
     * supplied by Sanity */
    defaultTitle: 'Health Plans & Primary Care | Firefly Health',
  },
};
