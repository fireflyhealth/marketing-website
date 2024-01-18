import { defineField, defineType, defineArrayMember } from 'sanity';
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
      name: 'navLinks',
      type: 'array',
      title: 'Navigation Links',
      of: [
        defineArrayMember({
          name: 'navLinkObject',
          type: 'object',
          initialValue: {
            showDropdown: false,
          },
          fields: [
            {
              name: 'page',
              type: 'reference',
              title: 'Link',
              to: [
                {
                  type: 'genericPage',
                },
              ],
            },
            {
              name: 'showDropdown',
              type: 'boolean',
              title: 'Show dropdown',
              description:
                'Toggle on to show referenced page`s subpages as a dropdown list',
            },
          ],
          preview: {
            select: {
              title: 'page.title',
              subtitle: 'showDropdown',
            },
            prepare({ title, subtitle }) {
              return { title, subtitle: `Show dropdown: ${subtitle}` };
            },
          },
        }),
      ],
    }),
  ],
});
