export const isStaticBuild = process.env.NEXT_PUBLIC_STATIC_BUILD === 'true';
export const appEnv = process.env.NEXT_PUBLIC_ENV;
export const isIndexingAllowed =
  process.env.NEXT_PUBLIC_IS_INDEXING_ALLOWED === 'true';
export const isLocalCmsDataEnabled =
  process.env.NEXT_PUBLIC_IS_LOCAL_CMS_DATA_ENABLED === 'true';

export const config = {
  /* Will be true only on production deployments */
  isProd: appEnv === 'production',
  sanity: {
    projectId: 'xgbrv2vi',
    apiVersion: '2024-01-01',
    dataset:
      process.env.NEXT_PUBLIC_FORCE_DATASET ||
      (appEnv === 'development' ? 'staging' : 'production'),
    useCdn: appEnv === 'development' ? true : false,
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
