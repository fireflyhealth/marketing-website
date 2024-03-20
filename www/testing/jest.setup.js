import '@testing-library/jest-dom';

import nextRouterMock from './mocks/nextRouterMock';
import nextHubspotMock from './mocks/nextHubspotMock';
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

jest.mock('next/router', () => nextRouterMock);
jest.mock('next-hubspot', () => nextHubspotMock);
export class IntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds = [];

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return [];
  }

  unobserve() {
    return null;
  }
}
window.IntersectionObserver = IntersectionObserver;
global.IntersectionObserver = IntersectionObserver;
