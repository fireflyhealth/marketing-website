import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const ImageTextOverlapBlock = defineType({
  name: 'imageTextOverlapBlock',
  title: 'Image Text Overlap Block',
  type: 'object',
  icon: icons.ImageTextOverlap,
  fields: [
    ...requiredBlockFields,
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
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      image: 'image',
      header: 'header',
    },
    prepare: ({ image, header }) => ({
      title: 'Image Text Overlap Block',
      media: image?.asset,
      subtitle: header?.title || image?.caption || image?.altText,
    }),
  },
});
