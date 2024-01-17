import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/fonts.css';
import '../src/styles/main.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story: React.ComponentType) => (
    <div className="storybook-inner">
      <Story />
    </div>
  ),
];

export default preview;
