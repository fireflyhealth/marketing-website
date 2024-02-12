import { defineType, defineField } from 'sanity';

export const ImageTextOverlapBlock = defineType({
  name: 'imageTextOverlapBlock',
  title: 'Image Text Overlap Block',
  type: 'object',
  fields: [
    defineField({
      name: 'header',
      title: 'Header',
      type: 'contentBlockHeader',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'richImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      description:
        'All text content, CTAs and bullets within the rich text field.',
      type: 'articleRichText',
    }),
  ],
});
