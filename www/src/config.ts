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
  datadog: {
    rum: {
      applicationId: '5d5310e3-3910-4f16-886a-c4966e745bea',
      clientToken: 'pub5e880234ed69e7f5a8e2a4bca62f20dd',
      service: 'firefly-health',
      site: 'us5.datadoghq.com',
    },
  },
};
