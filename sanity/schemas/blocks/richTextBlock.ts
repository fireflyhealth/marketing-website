import { defineType, defineField } from 'sanity';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const RichTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Rich Text Block',
  type: 'object',
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      initialValue: 'white',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      initialValue: '1-2',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: '1/2', value: '1-2' },
          { title: '2/3', value: '2-3' },
        ],
      },
    }),
    defineField({
      name: 'largerPadding',
      title: 'Larger Padding',
      type: 'boolean',
    }),
    defineField({
      name: 'text',
      title: 'text',
      type: 'articleRichText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      header: 'header',
    },
    prepare: ({ header }) => ({
      title: 'Rich Text Block',
      subtitle: header?.title,
    }),
  },
});
