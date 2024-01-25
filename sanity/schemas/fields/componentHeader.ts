import { defineType, defineField } from 'sanity';

export const ComponentHeader = defineType({
  name: 'componentHeader',
  title: 'Header',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Component Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Component Description',
      type: 'text',
    }),
    defineField({
      title: 'CTA',
      name: 'shareTitle',
      type: 'cta',
    }),
  ],
});
