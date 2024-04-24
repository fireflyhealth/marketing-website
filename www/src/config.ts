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
      applicationId: '5d5310e3-3910-4f16-886a-c4966e745bea',
      clientToken: 'pub5e880234ed69e7f5a8e2a4bca62f20dd',
      service: 'firefly-health',
      site: 'us5.datadoghq.com',
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
