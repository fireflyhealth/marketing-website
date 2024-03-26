/* eslint-disable import/no-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { config as appConfig } from './config';

/* TODO:
 * this is more readable but for some reason doesn't work. When
 * entries in config.matcher[] are not normal strings, they do
 * not seem to get picked up
 */
// const pathsToNotMatch = [
//   // API routes
//   'api',
//   // Static assets
//   '_next/static',
//   '_next/image',
//   'favicon.ico',
//   // Sentry
//   'monitoring',
// ].join('|');

// const string = `/((?!api|_next/static|_next/image|favicon.ico|monitoring).*)`;
// const template = `/((?!${pathsToNotMatch}).*)`;

// console.log(string, template, string === template);

export const config = {
  /* Only run this middleware on these routes */
  matcher: [
    /* Match all routes except those within this negative lookahead:
     *    ↓   ↓            ↓           ↓           ↓                 */
    `/((?!api|_next/static|_next/image|favicon.ico|monitoring|faq).*)`,
  ],
};

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const abCookie = req.cookies.get(appConfig.googleTagManager.ab.cookieName);
  const cookieValue = abCookie ? JSON.parse(abCookie.value) : null;
  if (
    cookieValue &&
    cookieValue === appConfig.googleTagManager.ab.cookieTestGroupValue
  ) {
    return NextResponse.rewrite(
      new URL(
        /* Remove any trailing slashes so we don't double up */
        pathname
          .replace(/\/$/, '')
          /* Add the b-content path to the rewrite */
          .concat('/b-content'),
        req.url,
      ),
    );
  }
  return;
}
