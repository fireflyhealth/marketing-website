import { defineType, defineField } from 'sanity';

export const DoubleCtaBlock = defineType({
  name: 'doubleCtaBlock',
  title: '2-up Big CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
    }),
    defineField({
      name: 'doubleCta',
      type: 'doubleCta',
    }),
  ],
});
