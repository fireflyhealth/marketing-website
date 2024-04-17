import { defineType } from 'sanity';

export const HeaderArea = defineType({
  name: 'headerArea',
  title: 'Header Area',
  type: 'array',
  of: [
    { type: 'simpleTextHeader' },
    { type: 'textHeader' },
    { type: 'textWithDualCtaHeader' },
    { type: 'twoUpHeader' },
    { type: 'videoHeader' },
  ],
  validation: (Rule) =>
    Rule.max(1).error('Ony one header is allowed per page.'),
});
