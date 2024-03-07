import { datadogRum } from '@datadog/browser-rum';
import { config } from '@/config';
import { AppError } from './appError';

datadogRum.init({
  applicationId: config.datadog.rum.applicationId,
  clientToken: config.datadog.rum.clientToken,
  site: config.datadog.rum.site,
  service: config.datadog.rum.service,
  env: process.env.NODE_ENV,
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
  beforeSend: (event, context) => {
    /* You can prevent events from being logged by returning false.
     * For example:
     *
     * if (isIrrelevant(event)) return false
     */
    if (event.type === 'error' && 'error' in context) {
      if (context.error instanceof AppError) {
        /* If we are logging an AppError, attach its tags and additional context
         * to the Datadog event context. This information will be available under
         * the 'Custom Attributes' dropdown in the Error Monitoring dashboard. */
        event.context = {
          ...(event.context || {}),
          tags: [context.error.category],
          /* TODO: throw an error with context, i.e.
           * throw new AppError('nearby', 'Nearyby error', { foo: 'bar' })
           * */
          context: context.error.context,
        };
      }
    }
    return true;
  },
});

/**
 * Report an error to Datadog without throwing
 */
export const reportUnthrownError = (error: Error | AppError) => {
  console.error(error);
  datadogRum.addError(error);
};
