export const FeaturedStoriesGrid = [
  'grid grid-cols-1 gap-y-6',
  'md:grid md:grid-cols-12 md:gap-y-16 md:gap-x-12',
];

export const FeaturedStoriesCardWrapper = (isWide: boolean) => [
  'col-span-1',
  isWide ? 'md:col-span-7' : 'md:col-span-5',
];
