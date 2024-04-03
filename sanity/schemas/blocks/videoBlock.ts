import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const VideoBlock = defineType({
  name: 'videoBlock',
  title: 'Video Block',
  type: 'object',
  icon: icons.Video,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'video',
      title: 'Video',
      type: 'video',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Video Block',
      };
    },
  },
});
