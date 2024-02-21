import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const QuoteBlock = defineType({
  name: 'quoteBlock',
  title: 'Quote Block',
  type: 'object',
  icon: icons.Quote,
  fields: [
    ...requiredBlockFields,
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
  preview: {
    select: {
      quote: 'quoteObject',
      header: 'header',
    },
    prepare: ({ quote, header }) => ({
      title: 'Quote Block',
      subtitle: header?.title || quote?.quote,
    }),
  },
});
