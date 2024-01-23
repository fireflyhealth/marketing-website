import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const Navigation = defineType({
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  icon: icons.Navigation,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      description:
        'The title should easily reference the use case for this navigation variant.',
    }),
    defineField({
      name: 'navGroup',
      type: 'array',
      title: 'Navigation Links',
      of: [
        {
          type: 'linkWithLabel',
        },
      ],
    }),
  ],
});
