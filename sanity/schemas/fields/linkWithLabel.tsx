import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const LinkWithLabel = defineType({
  name: 'linkWithLabel',
  title: 'Link with label',
  type: 'object',
  icon: icons.MenuItem,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label' },
    prepare: ({ title }) => ({ title }),
  },
});
