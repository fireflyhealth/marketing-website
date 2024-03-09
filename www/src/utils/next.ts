import { NextRouter } from 'next/router';
import { reportUnthrownError } from '@/lib/datadog';

/**
 * Use this to get a string param from the NextJS router.
 * It is possible that this param is provided as an array -
 * this helper will keep typescript happy and you won't
 * have to check manually every time.
 */
export const getParamAsString = (
  router: NextRouter,
  paramName: string,
): string | undefined => {
  const param = router.query[paramName];
  if (Array.isArray(param)) {
    reportUnthrownError([
      'nextjs',
      'Expected string param, got array',
      { paramName, path: router.asPath },
    ]);
    return undefined;
  }
  return param;
};
