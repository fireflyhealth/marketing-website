export const Wrapper = ['mt-16 relative min-h-[100vh]'];

export const HeaderWrapper = [
  'relative z-[1] w-full flex flex-col text-center space-y-[83px]',
  'lg:flex-row lg:space-y-0 lg:space-x-12',
];

export const Header = ['lg:w-1/2 lg:my-28 lg:mx-[82px]'];

export const PageTitle = [
  'font-size-3 font-trust theme-text-color-primary mb-8',
];

// add container-padding-bleed-mobile-only once #204 is merged.
export const ContactForm = ['w-full', 'lg:w-1/2'];

export const BackgroundColor = [
  '!z-[-2] !-top-[120px] full-width-background',
  'lg:!-top-[146px]',
];

// add container-padding-bleed-mobile-only once #204 is merged.
// remove margin classes
export const BackgroundImage = [
  '!z-0 mt-[38px] -mx-4 -mb-4 lg:m-0 lg:!top-[auto] lg:bottom-0 lg:!h-auto lg:full-width-background',
];
