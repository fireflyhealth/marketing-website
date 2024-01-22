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
              type: 'linkableDocument',
              title: 'Link',
            },
          ],
          preview: {
            select: {
              title: 'page.title',
            },
            prepare({ title }) {
              return { title };
            },
          },
        }),
      ],
    }),
  ],
});
