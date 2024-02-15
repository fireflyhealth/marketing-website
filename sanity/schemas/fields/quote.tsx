import { defineType, defineField } from 'sanity';

export const Quote = defineType({
  name: 'quoteObject',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'reference',
      to: [{ type: 'practitioner' }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
