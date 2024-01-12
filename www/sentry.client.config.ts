// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { AppError } from '@/lib/sentry';
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://4c40adfbc97c33bb549637192e14c6b9@o4506559649611776.ingest.sentry.io/4506559651840000',

  beforeSend(event, hint) {
    const error = hint.originalException;
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    if (error instanceof AppError) {
      event.tags = { category: error.category };
      event.extra = error.context;
    }
    return event;
  },

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    new Sentry.Replay({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
