import { defineType, defineField, defineArrayMember } from 'sanity';

export const TextHeader = defineType({
  name: 'textHeader',
  title: 'Text Header',
  type: 'object',
  fields: [
    defineField({
      name: 'theme',
      type: 'theme',
      title: 'Theme',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
    }),
    defineField({
      title: 'CTAs',
      name: 'ctas',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'CTA',
          name: 'cta',
          type: 'cta',
        }),
      ],
    }),
    defineField({
      title: 'Gradient Background',
      name: 'gradientBackground',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => {
      return {
        title: 'Text Header',
        subtitle: title,
      };
    },
  },
});
