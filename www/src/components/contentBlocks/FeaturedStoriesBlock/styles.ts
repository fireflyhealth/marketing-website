export const FeaturedStoriesGrid = [
  'grid grid-cols-1 gap-y-6',
  'md:grid md:grid-cols-12 md:gap-y-16 md:gap-x-12 md:mb-16',
];

export const FeaturedStoriesCardWrapper = (isWide: boolean) => [
  'col-span-1',
  // uniform layout for desktop (4 cards per row)
  // 'md:col-span-3',
  // modular layout for desktop (3 cards per row)
  isWide ? 'md:col-span-6' : 'md:col-span-3',
];
