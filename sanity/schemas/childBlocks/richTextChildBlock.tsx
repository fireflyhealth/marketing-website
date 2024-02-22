import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const RichTextChildBlock = defineType({
  name: 'richTextChildBlock',
  title: 'Rich Text Block',
  type: 'object',
  icon: icons.Text,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'body',
      title: 'Rich Text',
      type: 'limitedRichText',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
