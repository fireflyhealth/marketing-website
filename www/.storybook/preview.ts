import type { Preview } from '@storybook/react';
import '../src/styles/fonts.css';
import '../src/styles/main.css';
import '../src/styles/carousel.css';

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

export default preview;
