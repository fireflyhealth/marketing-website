import { defineType, defineField } from '@sanity-typed/types';

export const SEO = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description: <></>,
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title for Browser tab & search result listing',
      validation: (Rule) =>
        Rule.max(50).warning(
          'Longer titles may be truncated by search engines',
        ),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Summary for search result listing',
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
        'TItle used for social sharing cards. If empty, displays the Title field.',
      validation: (Rule) =>
        Rule.max(50).warning('Longer titles may be truncated by social sites'),
    }),
    defineField({
      title: 'Share Description',
      name: 'shareDescription',
      type: 'text',
      rows: 3,
      description:
        'Description for social sharing cards. If empty, displays the Description field',
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
      validation: (Rule) => Rule.optional(),
    }),
  ],
});
