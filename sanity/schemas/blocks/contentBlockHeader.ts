import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const ContentBlockHeader = defineType({
  name: 'contentBlockHeader',
  title: 'Block Header',
  type: 'object',
  options: {
    collapsed: true,
    collapsible: true,
  },
  icon: icons.Component,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichText',
    }),
    defineField({
      title: 'CTA',
      name: 'cta',
      type: 'cta',
    }),
  ],
});
