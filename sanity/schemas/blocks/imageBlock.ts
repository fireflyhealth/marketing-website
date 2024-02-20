import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const ImageBlock = defineType({
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  icon: icons.Image,
  fields: [
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
    }),
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
      media: image.asset,
      subtitle: header.title || image.caption || image.altText,
    }),
  },
});
