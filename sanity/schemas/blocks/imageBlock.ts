import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const ImageBlock = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  icon: icons.Image,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'image',
      type: 'richImage',
      title: 'Image',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      image: 'image',
      header: 'header',
    },
    prepare: ({ image, header }) => ({
      title: 'Image Block',
      media: image?.asset,
      subtitle: header?.title || image?.caption || image?.altText,
    }),
  },
});
