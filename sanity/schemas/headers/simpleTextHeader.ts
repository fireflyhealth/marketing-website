import { defineType, defineField, defineArrayMember } from 'sanity';

export const SimpleTextHeader = defineType({
  name: 'simpleTextHeader',
  title: 'Simple Text Header',
  type: 'object',
  fields: [
    defineField({
      name: 'theme',
      type: 'theme',
      title: 'Theme',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => {
      return {
        title: 'Simple Text Header',
        subtitle: title,
      };
    },
  },
});
