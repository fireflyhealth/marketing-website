import { defineArrayMember, defineField, defineType } from 'sanity';

export const LabelWithDropdown = defineType({
  name: 'labelWithDropdown',
  title: 'Label with Dropdown',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subpages',
      title: 'Subpages',
      type: 'array',
      validation: (Rule) => Rule.required(),
      of: [
        defineArrayMember({
          name: 'subpage',
          title: 'Subpage',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'link',
              title: 'Link',
              type: 'linkableDocument',
              validation: (Rule) => Rule.required(),
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
