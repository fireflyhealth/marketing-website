import { defineType, defineField } from 'sanity';

export const Video = defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'videoLink',
      title: 'Video Link',
      description: 'This field only accepts links from Vimo.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poser Image',
      description:
        'This image will render before the video until it finishes loading.',
      type: 'richImage',
    }),
  ],
});
