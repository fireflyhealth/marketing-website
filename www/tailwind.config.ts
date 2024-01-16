import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/svgs/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      trust: ['Trust', 'sans-serf'],
      roobert: ['Roobert', 'sans-serif'],
    },
    screens: {
      sm: '600px',
      md: '1200px',
      lg: '1920px',
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
      'midnight-light': '#29374A',
      sky: '#ABD9EA',
      'sky-medium': '#73B9D7',
      'sky-dark': '#3F819D',
      yellow: '#FFD714',
      'yellow-light': '#FEFFD6',
      'yellow-dark': '#F9BB2C',
    },
    extend: {},
  },
  plugins: [],
};
export default config;
