import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const RichQuote = defineType({
  name: 'richQuote',
  title: 'Article Quote',
  type: 'object',
  icon: icons.RichQuote,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'icon',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Article Quote' }),
  },
});
