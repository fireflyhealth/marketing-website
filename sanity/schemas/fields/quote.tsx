import { defineType, defineField } from 'sanity';

export const Quote = defineType({
  name: 'quoteObject',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'badgeImage',
      title: 'Top Image',
      description: '(Only appears in QuoteCard modules)',
      type: 'richImage',
    }),
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
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          description:
            'i.e. "Jane, 42" or "Blue Cross Blue Shield Massachussetts"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'labelSubtitle',
          title: 'Label (Line 2)',
          type: 'string',
          description: 'i.e. "Firefly member since 2018"',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'richImage',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
