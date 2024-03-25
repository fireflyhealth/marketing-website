import { defineType, defineField } from 'sanity';

export const Video = defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
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
      type: 'number',
      description:
        "The aspect ratio of the video (ex. 1.77). The aspect ratio formula is (height / width). If you don't add ratio, it will default to 16:9. This will effect the video container size, so make sure to add the correct ratio.",
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
});
