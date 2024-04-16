import { defineType, defineField } from 'sanity';

export const Metadata = defineType({
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  description: <></>,
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description:
        'Title for Browser tab & search result listing. Max 50 chars.',
      validation: (Rule) =>
        Rule.max(50).warning(
          'Longer titles may be truncated by search engines',
        ),
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      description: 'Summary for search result listing. Max 150 chars.',
      rows: 2,
      validation: (Rule) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines',
        ),
    }),
    defineField({
      title: 'Share Title',
      name: 'shareTitle',
      type: 'string',
      description:
        'TItle used for social sharing cards. If empty, displays the Title field. Max 50 chars.',
      validation: (Rule) =>
        Rule.max(50).warning('Longer titles may be truncated by social sites'),
    }),
    defineField({
      title: 'Share Description',
      name: 'shareDescription',
      type: 'text',
      rows: 3,
      description:
        'Description for social sharing cards. If empty, displays the Description field. Max 150 chars.',
      validation: (Rule) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by social sites',
        ),
    }),
    defineField({
      title: 'Share Graphic',
      name: 'shareGraphic',
      type: 'image',
      description: 'Share graphics will be cropped to 1200x630.',
      options: {
        hotspot: true,
      },
    }),
  ],
});
