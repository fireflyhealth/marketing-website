import { defineField, defineType, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';
import { API_VERSION } from '../../lib/constants';

export const BlogArticle = defineType({
  name: 'blogArticle',
  type: 'document',
  title: 'Blog Article',
  icon: icons.Article,
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
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        isUnique: async (currentSlug, { document, getClient }) => {
          const client = getClient({ apiVersion: API_VERSION });
          if (!document) {
            /* Keep TS happy */
            throw new Error('There was no document provided by the context');
          }
          /* Validate sub-pages are unique amongst siblings */
          const parentBlog = await client.fetch(
            `*[_type == "blog" && $articleId in articles[]._ref]{
            articles[]->{ _id, title, slug }
          }[0]`,
            { articleId: document._id },
          );
          if (!parentBlog) return true;
          const siblingSlugs = parentBlog.articles
            .filter((article) => article._id !== document._id)
            .map((article) => article.slug.current);

          if (siblingSlugs.includes(currentSlug)) {
            return false;
          }
          return true;
        },
      },
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
