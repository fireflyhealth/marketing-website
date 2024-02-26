import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const ContentBlockHeader = defineType({
  name: 'contentBlockHeader',
  title: 'Block Header',
  type: 'object',
  icon: icons.Component,
  description:
    /* Would be nice to use the hidden: (context) => { ... } function to hide this field when used
     * within a block that is the child of a "Parent Block" (i.e. 2-up block), but the context only
     * includes the immediate parent, so we can't determine if it is within one of these parent blocks. */
    'Note: The Header is ignored on content blocks that are children of other content blocks, i.e. those used within a 2-Up Block',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichText',
    }),
    defineField({
      title: 'CTA',
      name: 'cta',
      type: 'cta',
    }),
  ],
});
