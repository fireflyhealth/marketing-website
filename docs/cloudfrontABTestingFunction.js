// The name of the cookie that the Firefly site will use for its AB test.
// We will probably need to change this later.
const COOKIE_NAME = '_gtm_ab_experiment';
// A name to use in the cookie for the A control group.
const CONTROL_GROUP = '_gtm_ab_control';
// The name to use for the B experiment group.
const EXPERIMENT_GROUP = '_gtm_ab_test';

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
  if (controlUri.endsWith('/')) {
    controlUri = controlUri.slice(0, -1);
  }

  return `${controlUri}/b-content/`;
}

// Cloudfront will automagically pick up the last function declaration
// and use that as the function to evaluate for each incoming request.
async function handler(event) {
  const request = event.request;
  const group = getExistingGroup(request);

  if (group === undefined) {
    const newGroup = getRandomGroup();

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
          value: request.uri,
        },
      },
    };

    return response;
  }

  // If the user is in the B experiment group, rewrite the URL if necessary:
  if (group === EXPERIMENT_GROUP) {
    request.uri = buildExperimentUri(request.uri);
  }

  // Return the request to Cloudfront for processing.
  return request;
}
