import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const VideoChildBlock = defineType({
  name: 'videoChildBlock',
  title: 'Video Block',
  type: 'object',
  icon: icons.Video,
  fields: [
    defineField({
      name: 'video',
      type: 'video',
      title: 'Video',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      video: 'video',
    },
    prepare: ({ video }) => ({
      title: 'Video Block',
      media: video?.posterImage,
    }),
  },
});
