import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';

export const TitleDescriptionOrderedList = defineType({
  name: 'titleDescriptionOrderedList',
  title: 'Title Desciption Ordered List',
  type: 'object',
  icon: icons.TwoColumn,
  description:
    'This component allows you to create a list of text elements that render within two columns on desktop and one on mobile.',
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
    prepare: () => ({ title: 'Title Desciption Ordered List' }),
  },
});
