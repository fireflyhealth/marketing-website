import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const SmallImageCarouselBlock = defineType({
  name: 'smallImageCarouselBlock',
  title: 'Small Image Carousel',
  type: 'object',
  icon: icons.Carousel,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'richImage' }],
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],
  preview: {
    select: {
      header: 'header',
    },
    prepare: ({ header }) => ({
      title: 'Small Image carousel block',
      subtitle: header?.title,
    }),
  },
});
