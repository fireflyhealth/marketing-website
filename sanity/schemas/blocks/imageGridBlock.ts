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
      subtitle: 'images.length',
    },
    prepare: ({ subtitle }) => {
      return {
        title: 'Image Grid Block',
        subtitle: subtitle,
      };
    },
  },
});
