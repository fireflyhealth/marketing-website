import { defineField, defineType } from 'sanity';

export const LinkWithLabel = defineType({
  name: 'linkWithLabel',
  title: 'Link with label',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'linkableDocument',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label' },
    prepare: ({ title }) => ({ title }),
  },
});
