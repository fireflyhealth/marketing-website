import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';

export const BigOrderedList = defineType({
  name: 'bigOrderedList',
  title: 'Title Desciption Ordered List',
  type: 'object',
  icon: icons.TwoColumn,
  fields: [
    defineField({
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'listItem',
          title: 'List Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'simpleRichText',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Big Ordered List' }),
  },
});
