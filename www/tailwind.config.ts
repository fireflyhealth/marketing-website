import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    {
      pattern: /h-.+/,
    },
  ],
  theme: {
    fontFamily: {
      trust: ['Trust', 'Gill Sans', 'Calibri', 'sans-serf'],
      roobert: [
        'Roobert',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
      ],
      /* Used in Storybook */
      mono: 'Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;',
    },
    screens: {
      sm: '600px',
      md: '800px',
      lg: '1200px',
    },
    colors: {
      black: '#131D2B',
      white: '#FFFFFF',
      grey: '#F3F5F4',
      'grey-medium': '#E6E8E7',
      'grey-dark': '#CACCCB',
      'grey-darker': '#575958',
      sienna: '#7D320C',
      'sienna-lightest': '#FF7F29',
      'sienna-light': '#E1621A',
      'sienna-dark': '#521B00',
      midnight: '#131D2B',
      'midnight-70': 'rgba(19, 29, 43, 0.7)',
      'midnight-30': 'rgba(19, 29, 43, 0.3)',
      'midnight-light': '#29374A',
      'sky-light': '#D2E7F1',
      sky: '#ABD9EA',
      'sky-medium': '#73B9D7',
      'sky-dark': '#3F819D',
      yellow: '#FFD714',
      'yellow-light': '#FEFFD6',
      'yellow-light-70': 'rgba(254, 255, 214, 0.7)',
      'yellow-dark': '#F9BB2C',
      orange: '#F9BB2C',
      'orange-medium': '#EF8641',
      'orange-dark': '#D16A31',
      transparent: 'transparent',
    },
    extend: {
      /* TODO: Add spacing values. Search the codebase for
       * any TODO-SPACING comments */
      spacing: {
        'announcement-banner-height': 'var(--announcement-banner-height)',
        'mobile-nav-banner-margin':
          'calc(var(--mobile-globalnav-height) + var(--announcement-banner-height))',
        'desktop-nav-banner-margin':
          'calc(var(--desktop-globalnav-height) + var(--announcement-banner-height))',
        'bar-graph-height': 'var(--bar-graph-height)',
        'bar-graph-width': 'var(--bar-graph-width)',
        'block-wrapper-lg-padding': '48px',
        'block-wrapper-sm-padding': '24px',
      },
      backgroundImage: {
        'yellow-linear-gradient':
          'linear-gradient(180deg, #FFD714 49.81%, rgba(255, 215, 20, 0.82) 67.68%, rgba(255, 215, 20, 0.19) 88.41%, rgba(255, 255, 255, 0.00) 100%)',
      },
      zIndex: {
        navigation: '1000',
        navigationCTAGradient: '1010',
        navigationCTAContent: '1020',
      },
      scale: {
        '-100': '-1',
      },
    },
  },
  plugins: [],
};
export default config;
