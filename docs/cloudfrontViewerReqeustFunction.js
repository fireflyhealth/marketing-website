// The name of the cookie that the Firefly site will use for its AB test.
// We will probably need to change this later.
const COOKIE_NAME = '_gtm_ab_experiment';
// A name to use in the cookie for the A control group.
const CONTROL_GROUP = '_gtm_ab_control';
// The name to use for the B experiment group.
const EXPERIMENT_GROUP = '_gtm_ab_test';
// The parameter to append to the querystring after AB bucketing users.
const REDIRECTED_PARAM = 'redirected';

// Static mappings between old URL's and their new targets.
// This doesn't include redirects from pages with dynamic path components.
const STATIC_REDIRECT_MAP = {
  '/app': '/individuals',
  '/provider-resources': '/providers',
  '/about-us': '/about',
  '/services': '/about',
  '/care-team': '/about/care-team',
  '/care-team/tyler-mcclintock': '/about/care-team',
  '/care-team/yasmin-khan': '/about/care-team',
  '/leadership': '/about/leadership',
  '/articles': '/blog/newsroom',
  '/business-resources': '/blog/for-businesses',
  '/members': '/blog/for-members',
  '/network': '/blog/for-members',
  '/dose-of-clinical': '/blog/for-members',
  '/healthy-you': '/blog/for-members',
  '/from-our-care-team': '/blog/for-members',
  '/fitness-with-firefly': '/blog/for-members',
  '/real-recipes': '/blog/for-members',
  '/clinical-guidance': '/blog/clinical-guidance',
  '/clinical-guidance/adhd-agreement':
    '/blog/clinical-guidance/adhd-medication-guidelines/',
  '/clinical-guidance/visit':
    '/blog/clinical-guidance/annual-wellness-visit-q-and-a',
  '/clinical-guidance/high-blood-pressure':
    '/blog/clinical-guidance/high-blood-pressure-not-for-long',
  '/clinical-guidance/bonedensity':
    '/blog/clinical-guidance/bone-density-q-and-a',
  '/post/breast-cancer-q-a': '/blog/clinical-guidance/breast-cancer-q-and-a',
  '/post/cervical-cancer-q-a':
    '/blog/clinical-guidance/cervical-cancer-q-and-a',
  '/clinical-guidance/cold-treating':
    '/blog/clinical-guidance/treating-the-common-cold',
  '/clinical-guidance/covid':
    '/blog/clinical-guidance/you-re-due-for-a-covid-vaccine',
  '/clinical-guidance/covid-vaccine':
    '/blog/clinical-guidance/common-questions-about-the-covid-vaccine',
  '/clinical-guidance/flu':
    '/blog/clinical-guidance/you-re-due-for-a-flu-vaccine',
  '/clinical-guidance/labcorp':
    '/blog/clinical-guidance/you-have-labs-to-complete-at-labcorp',
  '/clinical-guidance/quest':
    '/blog/clinical-guidance/you-have-labs-to-complete-at-quest',
  '/clinical-guidance/lungcancer':
    '/blog/clinical-guidance/lung-cancer-q-and-a',
  '/clinical-guidance/cholesterol-food':
    '/blog/clinical-guidance/heart-healthy-foods-for-lower-cholesterol',
  '/clinical-guidance/pneumonia':
    '/blog/clinical-guidance/you-re-due-for-a-pneumonia-vaccine',
  '/clinical-guidance/poison-ivy':
    '/blog/clinical-guidance/common-questions-about-poison-ivy',
  '/clinical-guidance/pregnancy':
    '/blog/clinical-guidance/having-a-healthy-pregnancy',
  '/clinical-guidance/shingles':
    '/blog/clinical-guidance/having-a-healthy-pregnancy',
  '/clinical-guidance/prostatecancer':
    '/blog/clinical-guidance/prostate-cancer-q-and-a',
  '/clinical-guidance/rsv':
    '/blog/clinical-guidance/you-re-due-for-an-rsv-vaccine',
  '/clinical-guidance/tetanus':
    '/blog/clinical-guidance/you-re-due-for-a-tetanus-booster',
  '/clinical-guidance/healthy-weight-management':
    '/blog/clinical-guidance/weight-management-with-saxenda',
  '/clinical-guidance/wegovy':
    '/blog/clinical-guidance/weight-management-with-wegovy',
  '/clinical-guidance/contrave':
    '/blog/clinical-guidance/weight-management-with-contrave',
  '/clinical-faqs': '/faq',
  '/controlled-substances-faqs': '/faq',
  '/health-plan-faqs': '/faq',
  '/primary-care-faqs': '/faq',
  '/prior-authorization': '/providers',
  '/provider-faqs': '/faq',
  '/policies/email-sms-policy': '/terms',
  '/policies/terms-of-use': '/terms',
  '/policies/hipaa': '/hipaa',
  '/policies/machine-readable-files': '/machine-readable-files',
  '/policies/patients': '/privacy-policy',
  '/policies/privacy-policy': '/privacy-policy',
  '/care': '/individuals',
  '/virtual-primary-care': '/how-it-works',
  '/15min-call-confirmation': '/',
  '/archive/our-partners-old-page': '/',
  '/assignment-of-benefits': '/',
  '/care-pass': '/',
  '/care-you-deserve': '/',
  '/carriers': '/health-plans',
  '/mindfulness-with-firefly': '/',
  '/poppins': '/',
  '/primary-care': '/',
  '/quiz': '/',
  '/reports/xqj23a37': '/',
  '/returntowork': '/',
  '/rich-text-components': '/',
  '/search': '/',
  '/provider-search-report': '/',
  '/employers': '/for-employers',
};

function removeTrailingSlash(uri) {
  if (uri.endsWith('/')) {
    uri = uri.slice(0, -1);
  }

  return uri;
}

function getRandomGroup() {
  return Math.random() > 0.5 ? CONTROL_GROUP : EXPERIMENT_GROUP;
}

// If a group currently exists on the request cookie, return it.
// Otherwise, return undefined (no group has been assigned to this user yet).
function getExistingGroup(request) {
  const cookie = request.cookies[COOKIE_NAME];

  if (cookie === undefined) {
    return undefined;
  }

  return cookie.value;
}

function buildExperimentUri(controlUri) {
  // We don't want to serve experiment content for static files:
  if (controlUri.includes('.')) {
    return controlUri;
  }

  // Prevent duplicate slashes:
  controlUri = removeTrailingSlash(controlUri);

  return `${controlUri}/b-content/`;
}

function getExplicitRedirectUri(request) {
  if (request.uri === undefined) {
    return undefined;
  }

  // We can bail out of redirect logic for static files:
  if (request.uri.includes('.')) {
    return undefined;
  }

  // First check if this redirect is statically mapped.
  // Normalize by removing trailing slash.
  const staticUri = STATIC_REDIRECT_MAP[removeTrailingSlash(request.uri)];

  if (staticUri !== undefined) {
    return staticUri;
  }

  if (!request.uri.startsWith('/')) {
    return undefined;
  }

  // Now we need to check whether the source URL is a dynamic path.
  // Each of the mappings below uses a first-segment/:dynamic-slug* pattern.

  const segments = request.uri.slice(1).split('/');
  const firstSegment = segments.shift();
  const remainder = segments.join('/');

  switch (firstSegment) {
    case 'dose-of-clinical':
    case 'feature':
    case 'post':
    case 'recipes':
    case 'recipe-posts-full':
      return '/blog/for-members';

    case 'rtw-faq':
      return '/faq';

    case 'journeys':
    case 'rtw':
      return '/';

    case 'business-resources':
      return `/blog/for-businesses/${remainder}`;

    case 'clinical-guidance':
      return `/blog/clinical-guidance/${remainder}`;

    default:
      return undefined;
  }
}

function userWasAlreadyRedirected(request) {
  return request.querystring[REDIRECTED_PARAM] !== undefined;
}

// Given an object as found in `request.querystring`, return the string
// rendering of it. This includes the leading `?` if any parameters exist. If no
// parameters are found, returns an empty string.
function renderQuerystring(querystring) {
  const params = [];

  Object.keys(querystring).forEach((key) => {
    const param = querystring[key];

    if (param.multiValue) {
      param.multiValue.forEach((entry) => {
        params.push(`${key}=${entry.value}`);
      });
    } else {
      params.push(`${key}=${param.value}`);
    }
  });

  if (!params.length) {
    return '';
  }

  return '?' + params.join('&');
}

// Determines the URL to redirect the user to when the AB testing cookie
// is applied. Will add a ?redirected=true query parameter to the URL
// to prevent infinite redirects.
function getCookieRedirectLocation(request) {
  const querystring = renderQuerystring(
    Object.assign({}, request.querystring, {
      [REDIRECTED_PARAM]: { value: 'true' },
    }),
  );

  return `${request.uri}${querystring}`;
}

// Cloudfront will automagically pick up the last function declaration
// and use that as the function to evaluate for each incoming request.
async function handler(event) {
  const request = event.request;

  // DNS apex records (like fireflyhealth.com) can only be A records to specific
  // IP addresses, but we need to route to a CloudFront domain using a CNAME
  // record. Historically, to work around this, we've redirected to a `www.`
  // subdomain. In order to not impact search engine optimization, we continue
  // doing so here, even though Route53 alias records can still route apex
  // domains to CloudFront.
  // See https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-redirect-url.html
  const host = request.headers.host.value;
  if (!host.startsWith('www.')) {
    const response = {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: {
          // Note: request.uri includes leading slash.
          // Also preserve query parameters across redirects.
          value:
            'https://www.' +
            host +
            request.uri +
            renderQuerystring(request.querystring),
        },
      },
    };

    return response;
  }

  // Ensure that we're redirecting from well-known source pages. Next.js static
  // exports do not support redirects.
  // See https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#unsupported-features
  const redirectUri = getExplicitRedirectUri(request);
  if (redirectUri !== undefined) {
    const response = {
      statusCode: 308,
      statusDescription: 'Permanent Redirect',
      headers: {
        'cache-control': {
          value: 'no-store',
        },
        location: {
          // Preserve query parameters on redirects.
          value: redirectUri + renderQuerystring(request.querystring),
        },
      },
    };

    return response;
  }

  const group = getExistingGroup(request);
  const alreadyRedirected = userWasAlreadyRedirected(request);

  if (group === undefined && !alreadyRedirected) {
    const newGroup = getRandomGroup();
    const cookieRedirectLocation = getCookieRedirectLocation(request);

    // If the user hasn't yet been assigned an experiment group,
    // assign a random group, serve them a 302 Found with the cookie set,
    // and force them to reload the current page.
    const response = {
      statusCode: 302,
      statusDescription: 'Found',
      cookies: {
        [COOKIE_NAME]: {
          value: newGroup,
        },
      },
      headers: {
        'cache-control': {
          value: 'no-store',
        },
        location: {
          value: cookieRedirectLocation,
        },
      },
    };

    return response;
  }

  // If the user is in the B experiment group, rewrite the URL if necessary:
  if (group === EXPERIMENT_GROUP) {
    request.uri = buildExperimentUri(request.uri);
  }

  // Append `index.html` to requests if needed.
  // See https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html
  //
  // Check whether the URI is missing a file name.
  if (request.uri.endsWith('/')) {
    request.uri += 'index.html';
  }
  // Check whether the URI is missing a file extension.
  else if (!request.uri.includes('.')) {
    request.uri += '/index.html';
  }

  // Return the request to Cloudfront for processing.
  return request;
}
