const isStaticBuild = Boolean(process.env.STATIC_BUILD);
const isProd =
  isStaticBuild ||
  (process.env.NEXT_PUBLIC_VERCEL_ENV &&
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production');
const forceDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const config = {
  /* Will be true only on production deployments */
  isProd,
  sanity: {
    projectId: 'xgbrv2vi',
    apiVersion: '2024-01-01',
    dataset: forceDataset || isProd ? 'production' : 'staging',
    useCdn: isProd ? true : false,
  },
  metadata: {
    siteName: 'Firefly ',
    productionUrl: 'https://www.fireflyhealth.com',
    /* Final fallback. This will be overridden by the defaultMetadata
     * supplied by Sanity */
    defaultTitle: 'Health Plans & Primary Care | Firefly Health',
  },
  datadog: {
    rum: {
      applicationId: process.env.DATADOG_APPLICATION_ID || '',
      clientToken: process.env.DATADOG_CLIENT_TOKEN || '',
      service: process.env.DATADOG_SERVICE || '',
      site: process.env.DATADOG_SITE || '',
    },
  },
  googleTagManager: {
    /* the ID should be undefined (or an alternate property ID)
     * for staging so we do not clutter their analytics */
    id: 'GTM-PDTZ29Q7',
    ab: {
      cookieName: '_gtm_ab_experiment',
      cookieControlGroupValue: '_gtm_ab_control',
      cookieTestGroupValue: '_gtm_ab_test',
    },
  },
};
