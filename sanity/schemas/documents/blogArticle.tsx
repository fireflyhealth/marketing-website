import { defineField, defineType } from 'sanity';
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
      name: 'category',
      title: 'Parent Blog',
      type: 'reference',
      to: [{ type: 'blog' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: (Rule) =>
        Rule.custom(async (currentSlug, { document, getClient }) => {
          const client = getClient({ apiVersion: API_VERSION });
          if (!document) {
            /* Keep TS happy */
            throw new Error('There was no document provided by the context');
          }
          // @ts-ignore
          const parentBlogId = document.category?._ref;
          const blogId = document._id;
          if (!parentBlogId) {
            return true;
          }
          if (!currentSlug) {
            return 'Required';
          }
          /* Validate that blog slugs are unique among parent blogs */
          const [parentBlog, siblings] = await Promise.all([
            client.fetch(
              `*[_type == "blog" && _id == $parentBlogId]{ title }[0]`,
              { parentBlogId },
            ),
            client.fetch(
              `*[
              _type == "blogArticle"
              && _id != $blogId
              && category._ref == $parentBlogId
              ]{
                slug
              }`,
              { parentBlogId, blogId },
            ),
          ]);
          const siblingSlugs = siblings.map((article) => article.slug.current);
          if (siblingSlugs.includes(currentSlug.current)) {
            return `There is already an article within the ${parentBlog.title} blog with the slug ${currentSlug}`;
          }
          return true;
        }),
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    }),
  ],
  preview: {
    select: {
      parentBlogTitle: 'category.title',
      title: 'title',
    },
    prepare: ({ parentBlogTitle, title }) => {
      return {
        title,
        subtitle: parentBlogTitle,
        /* TODO: Add preview config that displays the publish date in the subtitle */
      };
    },
  },
});
