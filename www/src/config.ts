const isProd =
  process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'production';
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
      applicationId: '5d5310e3-3910-4f16-886a-c4966e745bea',
      clientToken: 'pub5e880234ed69e7f5a8e2a4bca62f20dd',
      service: 'firefly-health',
      site: 'us5.datadoghq.com',
    },
  },
  /* TODO: Update this with Firefly's GTM Property ID and AB cookie values. */
  googleTagManager: {
    /* the ID should be undefined (or an alternate property ID)
     * for staging so we do not clutter their analytics */
    id: 'GTM-NDDH54JG',
    ab: {
      cookieName: '_gtm_ab_experiment',
      cookieControlGroupValue: '_gtm_ab_control',
      cookieTestGroupValue: '_gtm_ab_test',
    },
  },
};
