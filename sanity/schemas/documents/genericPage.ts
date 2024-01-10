import { defineField, defineType } from '@sanity-typed/types';
import { icons } from '../../lib/icons';

export const GenericPage = defineType({
  name: 'genericPage',
  title: 'Page',
  type: 'document',
  icon: icons.Page,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title }),
  },
});
