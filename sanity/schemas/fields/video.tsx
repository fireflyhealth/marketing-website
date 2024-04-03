import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const Video = defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  icon: icons.Video,
  fields: [
    defineField({
      name: 'videoLink',
      title: 'Video Link',
      description:
        'This field only accepts links from Vimeo (ex. https://vimeo.com/902416562/fdfdade255).  Landscape videos work best.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoRatio',
      title: 'Video Ratio',
      description:
        "The aspect ratio of the video (ex. 16:9). The aspect ratio formula is (height / width). If you don't add ratio, it will default to 16:9. This will effect the video container size, so make sure to add the correct ratio.",
      type: 'number',
      options: {
        list: [
          { title: '16:9 (horizontal)', value: 9 / 16 },
          { title: '9:16 (vertical)', value: 16 / 9 },
          { title: '4:3 (traditional fullscreen)', value: 3 / 4 },
          { title: '1:1 (square)', value: 1 },
        ],
      },
      initialValue: 16 / 9,
    }),
    defineField({
      name: 'posterImage',
      title: 'Poser Image',
      description:
        'The poster image will show before a video is played and while it is paused.',
      type: 'richImage',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'posterImage.asset',
    },
    prepare: ({ media }) => {
      return {
        title: 'Video',
        media,
      };
    },
  },
});
