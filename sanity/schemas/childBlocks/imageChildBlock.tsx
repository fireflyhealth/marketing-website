import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const ImageChildBlock = defineType({
  name: 'imageChildBlock',
  title: 'Image Block',
  type: 'object',
  icon: icons.Image,
  fields: [
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
    },
    prepare: ({ image }) => ({
      title: image?.altText || '(empty)',
      media: image?.asset,
      subtitle: image?.caption,
    }),
  },
});
