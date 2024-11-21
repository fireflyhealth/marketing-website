import type { Config } from 'tailwindcss';

export const enum BREAK_POINTS {
  'SM' = 600,
  'MD' = 800,
  'LG' = 1220,
}

export const config: Config = {
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
      sm: `${BREAK_POINTS.SM}px`,
      md: `${BREAK_POINTS.MD}px`,
      lg: `${BREAK_POINTS.LG}px`,
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
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      spacing: {
        '0': '0rem', // 0px
        '0.5': '0.125rem', // 2px
        '1': '0.25rem', // 4px
        '1.5': '0.375rem', // 6px
        '2': '0.5rem', // 8px
        '2.5': '0.625rem', // 10px
        '3': '0.75rem', // 12px
        '3.5': '0.875rem', // 14px
        '4': '1rem', // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem', // 24px
        '8': '2rem', // 32px
        '10': '2.5rem', // 40px
        '11': '2.75rem', // 44px
        '12': '3rem', // 48px
        '14': '3.5rem', // 56px
        '16': '4rem', // 64px
        '20': '5rem', // 80px
        '24': '6rem', // 96px
        '28': '7rem', // 112px
        '32': '8rem', // 128px
        '36': '9rem', // 144px
        '40': '10rem', // 160px
        '44': '11rem', // 176px
        '48': '12rem', // 192px
        '52': '13rem', // 208px
        '56': '14rem', // 224px
        '64': '16rem', // 256px
        '72': '18rem', // 288px
        '80': '20rem', // 320px
        '96': '24rem', // 384px
        'container-lg-padding': 'var(--container-lg-padding)',
        'container-md-padding': 'var(--container-md-padding)',
        'container-sm-padding': 'var(--container-sm-padding)',
        'grid-margin-lg': 'var(--grid-margin-lg)',
        'grid-margin-sm': 'var(--grid-margin-sm)',
        vhMinusNavDesktop: 'calc(100vh - var(--nav-height-desktop))',
        vhMinusNavTablet: 'calc(100vh - var(--nav-height-tablet))',
        vhMinusNavMobile: 'calc(100vh - var(--nav-height-mobile))',
      },
      backgroundImage: {
        'yellow-linear-gradient':
          'linear-gradient(180deg, #FFD714 49.81%, rgba(255, 215, 20, 0.82) 67.68%, rgba(255, 215, 20, 0.19) 88.41%, rgba(255, 255, 255, 0.00) 100%)',
      },
      zIndex: {
        announcementBanner: '1020',
        navigation: '1010',
        navigationCTAContent: '1000',
      },
      scale: {
        '-100': '-1',
      },
      keyframes: {
        segmentPoint: {
          '0%': {
            top: '60px',
            opacity: '0',
          },
          '100%': {
            top: 'var(--segment-top-offset)',
            opacity: '1',
          },
        },
        topSegmentLeftBorderMobile: {
          '0%': { top: '-100%' },
          '100%': { top: '0%' },
        },
        topSegmentLeftBorderTabletDesktop: {
          '0%': { top: '-100%' },
          '100%': { top: '2%' },
        },
        topSegmentBottomBorder: {
          '0%': { left: '-57%' },
          '100%': { left: '0%' },
        },
        middleSegmentTopBorder: {
          '0': { left: '-100%' },
          '100%': { left: '2px' },
        },
        middleSegmentRightBorder: {
          '0': { top: '-99.95%' },
          '100%': { top: '0' },
        },
      },
      animation: {
        segmentPoint: 'segmentPoint 0.5s ease-in forwards',
        topSegmentMobile:
          'topSegmentLeftBorderMobile 0.75s ease-in 0.5s forwards',
        topSegmentTabletDesktop:
          'topSegmentLeftBorderTabletDesktop 0.25s ease-in 0.5s forwards, topSegmentBottomBorder 0.25s linear 0.75s forwards',
        middleSegment:
          'middleSegmentTopBorder 0.25s linear 0.9s forwards, middleSegmentRightBorder 0.5s linear 1.15s forwards',
      },
    },
  },
  plugins: [],
};
export default config;
