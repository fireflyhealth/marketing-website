import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const FAQCategory = defineType({
  name: 'faqCategory',
  type: 'document',
  title: 'FAQ Category',
  icon: icons.Question,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: { source: 'title' },
    }),
  ],
});
