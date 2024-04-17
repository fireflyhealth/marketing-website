import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const BlogArticleTag = defineType({
  name: 'blogArticleTag',
  title: 'Article Tag',
  type: 'document',
  icon: icons.Tag,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      description:
        'Optional. If provided, this link will be used to link tag button on top of article title on article page.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
