const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isStaticBuild = Boolean(process.env.STATIC_BUILD);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStaticBuild ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
    deviceSizes: [375, 414, 520, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [
      16, 32, 48, 64, 96, 128, 256, 320, 384, 416, 512, 576, 620, 700, 760, 800,
      832, 1024, 1152, 995, 1920,
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  env: {
    DATADOG_APPLICATION_ID: process.env.DATADOG_APPLICATION_ID,
    DATADOG_CLIENT_TOKEN: process.env.DATADOG_CLIENT_TOKEN,
    DATADOG_SERVICE: process.env.DATADOG_SERVICE,
    DATADOG_SITE: process.env.DATADOG_SITE,
    NEXT_PUBLIC_STATIC_BUILD: Boolean(process.env.STATIC_BUILD),
    NEXT_PUBLIC_FORCE_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/individuals',
        permanent: true,
      },
      {
        source: '/provider-resources',
        destination: '/providers',
        permanent: true,
      },
      // About redirects
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/care-team',
        destination: '/about/care-team',
        permanent: true,
      },
      {
        source: '/care-team/tyler-mcclintock',
        destination: '/about/care-team',
        permanent: true,
      },
      {
        source: '/care-team/yasmin-khan',
        destination: '/about/care-team',
        permanent: true,
      },
      {
        source: '/leadership',
        destination: '/about/leadership',
        permanent: true,
      },
      // Newsroom blog redirects
      {
        source: '/articles',
        destination: '/blog/newsroom',
        permanent: true,
      },
      // For Businesses blog redirects
      {
        source: '/business-resources/:slug*',
        destination: '/blog/for-businesses/:slug*',
        permanent: true,
      },
      {
        source: '/business-resources',
        destination: '/blog/for-businesses',
        permanent: true,
      },
      // For Members blog redirects
      {
        source: '/dose-of-clinical/:slug*',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/feature/:slug*',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/post/:slug*',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/recipes/:slug*',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/recipe-posts-full/:slug*',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/members',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/network',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/dose-of-clinical',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/healthy-you',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/from-our-care-team',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/fitness-with-firefly',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/real-recipes',
        destination: '/blog/for-members',
        permanent: true,
      },
      // Clinical Guidance blog redirects
      {
        source: '/clinical-guidance/:slug*',
        destination: '/blog/clinical-guidance/:slug*',
        permanent: true,
      },
      {
        source: '/clinical-guidance',
        destination: '/blog/clinical-guidance',
        permanent: true,
      },
      {
        source: '/clinical-guidance/adhd-agreement',
        destination: '/blog/clinical-guidance/adhd-medication-guidelines/',
        permanent: true,
      },
      {
        source: '/clinical-guidance/visit',
        destination: '/blog/clinical-guidance/annual-wellness-visit-q-and-a',
        permanent: true,
      },
      {
        source: '/clinical-guidance/high-blood-pressure',
        destination: '/blog/clinical-guidance/high-blood-pressure-not-for-long',
        permanent: true,
      },
      {
        source: '/clinical-guidance/bonedensity',
        destination: '/blog/clinical-guidance/bone-density-q-and-a',
        permanent: true,
      },
      {
        source: '/post/breast-cancer-q-a',
        destination: '/blog/clinical-guidance/breast-cancer-q-and-a',
        permanent: true,
      },
      {
        source: '/post/cervical-cancer-q-a',
        destination: '/blog/clinical-guidance/cervical-cancer-q-and-a',
        permanent: true,
      },
      {
        source: '/clinical-guidance/cold-treating',
        destination: '/blog/clinical-guidance/treating-the-common-cold',
        permanent: true,
      },
      {
        source: '/clinical-guidance/covid',
        destination: '/blog/clinical-guidance/you-re-due-for-a-covid-vaccine',
        permanent: true,
      },
      {
        source: '/clinical-guidance/covid-vaccine',
        destination:
          '/blog/clinical-guidance/common-questions-about-the-covid-vaccine',
        permanent: true,
      },
      {
        source: '/clinical-guidance/flu',
        destination: '/blog/clinical-guidance/you-re-due-for-a-flu-vaccine',
        permanent: true,
      },
      {
        source: '/clinical-guidance/labcorp',
        destination:
          '/blog/clinical-guidance/you-have-labs-to-complete-at-labcorp',
        permanent: true,
      },
      {
        source: '/clinical-guidance/quest',
        destination:
          '/blog/clinical-guidance/you-have-labs-to-complete-at-quest',
        permanent: true,
      },
      {
        source: '/clinical-guidance/lungcancer',
        destination: '/blog/clinical-guidance/lung-cancer-q-and-a',
        permanent: true,
      },
      {
        source: '/clinical-guidance/cholesterol-food',
        destination:
          '/blog/clinical-guidance/heart-healthy-foods-for-lower-cholesterol',
        permanent: true,
      },
      {
        source: '/clinical-guidance/pneumonia',
        destination:
          '/blog/clinical-guidance/you-re-due-for-a-pneumonia-vaccine',
        permanent: true,
      },
      {
        source: '/clinical-guidance/poison-ivy',
        destination:
          '/blog/clinical-guidance/common-questions-about-poison-ivy',
        permanent: true,
      },
      {
        source: '/clinical-guidance/pregnancy',
        destination: '/blog/clinical-guidance/having-a-healthy-pregnancy',
        permanent: true,
      },
      {
        source: '/clinical-guidance/shingles',
        destination: '/blog/clinical-guidance/having-a-healthy-pregnancy',
        permanent: true,
      },
      {
        source: '/clinical-guidance/prostatecancer',
        destination:
          '/blog/clinical-guidance/you-re-due-for-the-shingles-vaccine',
        permanent: true,
      },
      {
        source: '/clinical-guidance/rsv',
        destination: '/blog/clinical-guidance/you-re-due-for-an-rsv-vaccine',
        permanent: true,
      },
      {
        source: '/clinical-guidance/tetanus',
        destination: '/blog/clinical-guidance/you-re-due-for-a-tetanus-booster',
        permanent: true,
      },
      {
        source: '/clinical-guidance/healthy-weight-management',
        destination: '/blog/clinical-guidance/weight-management-with-saxenda',
        permanent: true,
      },
      {
        source: '/clinical-guidance/wegovy',
        destination: '/blog/clinical-guidance/weight-management-with-wegovy',
        permanent: true,
      },
      {
        source: '/clinical-guidance/contrave',
        destination: '/blog/clinical-guidance/weight-management-with-contrave',
        permanent: true,
      },
      // FAQ redirects
      {
        source: '/rtw-faq/:slug*',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/clinical-faqs',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/controlled-substances-faqs',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/health-plan-faqs',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/primary-care-faqs',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/prior-authorization',
        destination: '/providers',
        permanent: true,
      },
      {
        source: '/provider-faqs',
        destination: '/faq',
        permanent: true,
      },
      // Legal redirects
      {
        source: '/policies/email-sms-policy',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/policies/terms-of-use',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/policies/hipaa',
        destination: '/hipaa',
        permanent: true,
      },
      {
        source: '/policies/machine-readable-files',
        destination: '/machine-readable-files',
        permanent: true,
      },
      {
        source: '/policies/patients',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/policies/privacy-policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      // Generic page redirects
      {
        source: '/care',
        destination: '/individuals',
        permanent: true,
      },
      {
        source: '/virtual-primary-care',
        destination: '/how-it-works',
        permanent: true,
      },
      // Homepage redirects
      {
        source: '/journeys/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/rtw/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/15min-call-confirmation',
        destination: '/',
        permanent: true,
      },
      {
        source: '/archive/our-partners-old-page',
        destination: '/',
        permanent: true,
      },
      {
        source: '/assignment-of-benefits',
        destination: '/',
        permanent: true,
      },
      {
        source: '/care-pass',
        destination: '/',
        permanent: true,
      },
      {
        source: '/care-you-deserve',
        destination: '/',
        permanent: true,
      },
      {
        source: '/carriers',
        destination: '/health-plans',
        permanent: true,
      },
      {
        source: '/mindfulness-with-firefly',
        destination: '/',
        permanent: true,
      },
      {
        source: '/poppins',
        destination: '/',
        permanent: true,
      },
      {
        source: '/primary-care',
        destination: '/',
        permanent: true,
      },
      {
        source: '/quiz',
        destination: '/',
        permanent: true,
      },
      {
        source: '/reports/xqj23a37',
        destination: '/',
        permanent: true,
      },
      {
        source: '/returntowork',
        destination: '/',
        permanent: true,
      },
      {
        source: '/rich-text-components',
        destination: '/',
        permanent: true,
      },
      {
        source: '/search',
        destination: '/',
        permanent: true,
      },
      {
        source: '/provider-search-report',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withBundleAnalyzer(
  withSentryConfig(
    module.exports,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,
      org: 'firefly-health-dp',
      project: 'firefly-website',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
      tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      // Enables automatic instrumentation of Vercel Cron Monitors.
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    },
  ),
);
