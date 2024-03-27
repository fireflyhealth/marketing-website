import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const Navigation = defineType({
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  icon: icons.Navigation,
  initialValue: {
    showNavCTA: false,
  },
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
        {
          type: 'labelWithDropdown',
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'showNavCTA',
      title: 'Show Nav CTA',
      type: 'boolean',
    }),
  ],
});
