import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const HeaderContentChildBlock = defineType({
  name: 'headerContentChildBlock',
  title: 'Header Content Block',
  type: 'object',
  icon: icons.HeaderContent,
  fields: [
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      initialValue: 'small',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Large', value: 'large' },
        ],
      },
    }),
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
      name: 'cta',
      title: 'CTA',
      type: 'cta',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => {
      return {
        title: title,
      };
    },
  },
});
