import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const VideoBlock = defineType({
  name: 'videoBlock',
  title: 'Video Block',
  icon: icons.Video,
  type: 'object',
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'video',
      title: 'Video',
      type: 'video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      subtitle: 'title',
    },
    prepare: ({ subtitle }) => {
      return {
        title: 'Video Block',
        subtitle,
      };
    },
  },
});
