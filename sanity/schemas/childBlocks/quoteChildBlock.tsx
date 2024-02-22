import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const QuoteChildBlock = defineType({
  name: 'quoteChildBlock',
  title: 'Quote Block',
  type: 'object',
  icon: icons.Quote,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'quoteObject',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
    },
    prepare: ({ quote: quoteObject }) => {
      if (!quoteObject || !quoteObject.quote) {
        return { title: '(empty)' };
      }
      const { quote, badgeImage, attribution } = quoteObject;
      const subtitle = [quote, attribution?.label, attribution?.labelSubtitle]
        .filter(Boolean)
        .join(', ');

      return {
        title: 'Quote Block',
        subtitle,
        media: badgeImage,
      };
    },
  },
});
