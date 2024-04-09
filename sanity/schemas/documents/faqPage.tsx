import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const FAQPage = defineType({
  name: 'faqPage',
  type: 'document',
  title: 'FAQs',
  icon: icons.Question,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigationOverrides',
      type: 'navigationOverrides',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'headerArea',
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
});
