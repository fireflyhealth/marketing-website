import { defineType, defineField } from 'sanity';
import { requiredBlockFields } from './utils/requiredBlockFields';
import { icons } from '../../lib/icons';

export const RichTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Rich Text Block',
  type: 'object',
  icon: icons.RichText,
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
      richTextChildBlock: 'richTextChildBlock',
    },
    prepare: ({ richTextChildBlock }) => ({
      title: 'Rich Text Block',
      subtitle: richTextChildBlock?.heading,
    }),
  },
});
