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
      name: 'richTextChildBlock',
      title: 'Rich Text',
      type: 'richTextChildBlock',
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
