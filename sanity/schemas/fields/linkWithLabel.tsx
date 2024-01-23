import { defineArrayMember, defineField, defineType } from 'sanity';

export const LinkWithLabel = defineType({
  name: 'linkWithLabel',
  title: 'Link with label',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'label',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'linkableDocument',
    }),
    defineField({
      name: 'subpages',
      title: 'Subpages',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'subpage',
          title: 'Subpage',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'label',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'linkableDocument',
            },
          ],
          preview: {
            select: { title: 'label' },
            prepare: ({ title }) => ({ title }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'label' },
    prepare: ({ title }) => ({ title }),
  },
});
