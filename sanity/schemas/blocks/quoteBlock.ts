import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const QuoteBlock = defineType({
  name: 'quoteBlock',
  title: 'Quote Block',
  type: 'object',
  icon: icons.Quote,
  fields: [
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
    }),
    defineField({
      name: 'quoteObject',
      type: 'quoteObject',
      title: 'Quote',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'CTA',
      validation: (Rule) => Rule.required(),
    }),
  ],
});