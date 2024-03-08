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
