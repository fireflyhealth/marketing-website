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
      name: 'posterImage',
      title: 'Poser Image',
      description:
        'The poster image will show before a video is played and while it is paused.',
      type: 'richImage',
    }),
  ],
});
