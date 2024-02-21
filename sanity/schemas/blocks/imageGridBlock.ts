import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const ImageGridBlock = defineType({
  name: 'imageGridBlock',
  title: 'Image Grid Block',
  type: 'object',
  icon: icons.Grid,
  fields: [
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'richImage' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      header: 'header',
      images: 'images',
    },
    prepare: ({ images, header }) => {
      const subtitle = header?.title
        ? `${images.length} Image(s) | ${header.title}`
        : `${images.length} Image(s)`;
      return {
        title: 'Image Grid Block',
        subtitle,
      };
    },
  },
});
