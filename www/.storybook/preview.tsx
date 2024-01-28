import React from 'react';
import type { Preview } from '@storybook/react';
import { UIProvider } from '../src/context';
import '../src/styles/fonts.css';
import '../src/styles/main.css';
import './storybook.css';

import { Theme, ColorTheme } from '../src/components/Theme';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: ColorTheme.White,
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          ColorTheme.White,
          ColorTheme.Grey,
          ColorTheme.Sienna,
          ColorTheme.Midnight,
          ColorTheme.Sky,
        ],
      },
    },
  },
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

type Context = {
  globals: {
    theme: ColorTheme;
  };
};

export const decorators = [
  (Story: React.ComponentType, context: Context) => (
    <Theme theme={context.globals.theme}>
      <UIProvider>
        <div
          className="storybook-inner font-roobert"
          style={{ backgroundColor: 'rgb(225, 225, 225)' }}
        >
          <Story />
        </div>
      </UIProvider>
    </Theme>
  ),
];

export default preview;
