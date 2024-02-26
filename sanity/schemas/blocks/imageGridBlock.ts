import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const ImageGridBlock = defineType({
  name: 'imageGridBlock',
  title: 'Image Grid Block',
  type: 'object',
  icon: icons.Grid,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'White',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Grey', value: 'grey' },
        ],
      },
      validation: (Rule) => Rule.required(),
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
