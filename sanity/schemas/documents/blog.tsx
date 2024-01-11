import { defineField, defineType, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';

export const Blog = defineType({
  name: 'blog',
  type: 'document',
  title: 'Blog',
  icon: icons.Blog,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'articles',
      type: 'array',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'blogArticle' }] }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    }),
  ],
});
