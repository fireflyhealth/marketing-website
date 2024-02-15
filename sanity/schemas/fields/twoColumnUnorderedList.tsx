import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';

export const TwoColumnUnorderedList = defineType({
  name: 'twoColumnUnorderedList',
  title: 'Two Column Unordered List',
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
          type: 'string',
          description: 'Enter text that you want to appear for this list item.',
        }),
      ],
      validation: (Rule) => Rule.required().min(2),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Two Column Unordered List' }),
  },
});
