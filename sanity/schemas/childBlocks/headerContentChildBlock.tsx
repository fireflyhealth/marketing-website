import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const HeaderContentChildBlock = defineType({
  name: 'headerContentChildBlock',
  title: 'Header Content Block',
  type: 'object',
  icon: icons.HeaderContent,
  fields: [
    defineField({
      name: 'eyebrowImage',
      title: 'Eyebrow Image',
      type: 'richImage',
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
      name: 'ata',
      title: 'CTA',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      header: 'header',
      body: 'body',
    },
    prepare: ({ header, body }) => {
      return {
        title: header,
        subtitle: body,
      };
    },
  },
});
