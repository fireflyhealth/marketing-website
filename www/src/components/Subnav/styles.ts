const SharedWrapperStyle = 'Subnav z-50 top-0 pb-5 !mt-0 flex';

export const Wrapper = [
  SharedWrapperStyle,
  'lg:sticky my-8 justify-center items-center',
];

export const MobileWrapper = [
  SharedWrapperStyle,
  'Subnav__mobile transition-all fixed transition -translate-y-[148px] lg:hidden w-full',
];

export const InnerWrapper = [
  'space-x-3 lg:space-x-[30px] flex flex-wrap items-center md:px-12 justify-center',
];

export const MobileInnerWrapper = [
  'Subnav__mobile-inner-wrapper mx-auto space-x-3 flex overflow-x-scroll px-4 md:px-12',
];

export const SubnavItemWrapper = [
  'Subnav__item font-roobert font-size-8--cta flex items-center pl-2 pr-3 py-1 mt-5 bg-grey rounded-[100px] text-nowrap cursor-pointer',
];

export const SubnavItemCircle = [
  'Subnav__item-circle transition circle bg-yellow rounded-full mr-1.5',
];
