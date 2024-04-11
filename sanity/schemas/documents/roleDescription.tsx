import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { richTextToString } from '../../lib/richTextToString';

export const RoleDescription = defineType({
  name: 'roleDescription',
  title: 'Role Description',
  type: 'document',
  icon: icons.Description,
  fields: [
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichText',
    }),
  ],
  preview: {
    select: {
      role: 'role',
      description: 'description',
    },
    prepare: ({ role, description }) => {
      return {
        title: role,
        subtitle: richTextToString(description),
      };
    },
  },
});
