import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const HeaderBlock = defineType({
  name: 'headerBlock',
  title: 'Header Block',
  type: 'object',
  icon: icons.Component,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      title: 'CTA',
      name: 'cta',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => {
      return {
        title,
        subtitle: 'Header Block',
      };
    },
  },
});
