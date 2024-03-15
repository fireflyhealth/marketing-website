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
      name: 'containerLayout',
      title: 'Container Layout',
      type: 'string',
      initialValue: '50-left',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: '50% width (desktop) / Center align', value: '50-center' },
          { title: '50% width (desktop) / Left align', value: '50-left' },
          { title: '80% width (desktop) / Left align', value: '80-left' },
        ],
      },
    }),
    defineField({
      name: 'removeContainerSpacing',
      type: 'boolean',
      title: 'Remove Container Spacing',
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
