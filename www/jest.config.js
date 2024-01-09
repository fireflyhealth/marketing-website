const nextJest = require('next/jest.js');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  /**
   * A slight change to the default (see https://jestjs.io/docs/configuration#testmatch-arraystring)
   * This will match any file that is:
   * - within a directory named __tests__
   * - *and* has a filename ending in .test.tsx | .test.ts | .test.jsx | .test.js
   *
   * This lets us co-locate additional files (such as mock data) without Jest expecting them to be
   * test files.
   */
  testMatch: ['**/__tests__/**/*.(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/testing/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/testing/mocks/svgMock.tsx',
  },
};

module.exports = createJestConfig(customJestConfig);
