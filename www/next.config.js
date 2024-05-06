const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isStaticBuild = Boolean(process.env.STATIC_BUILD);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStaticBuild ? 'export' : undefined,
  trailingSlash: true,
  images: {
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
        source: '/clinical-guidance/:slug*',
        destination: '/blog/for-members',
        permanent: true,
      },
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
        source: '/clinical-guidance',
        destination: '/blog/for-members',
        permanent: true,
      },
      {
        source: '/dose-of-clinical',
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
        destination: '/faq',
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
        destination: '/how-it-works',
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
        destination: '/',
        permanent: true,
      },
      {
        source: '/from-our-care-team',
        destination: '/',
        permanent: true,
      },
      {
        source: '/healthy-you',
        destination: '/',
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
