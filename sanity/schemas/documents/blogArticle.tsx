import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { API_VERSION } from '../../lib/constants';
import { readOnlyIfNotBaseLang } from '../../lib/readOnlyIfNotBaseLang';
import localizationSlugField from '../../lib/localizationSlugField';
import { isUniqueAcrossDocuments } from '../../lib/isUniqueAcrossDocuments';

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
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      options: {
        dateFormat: 'MMMM DD, YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Parent Blog',
      type: 'reference',
      to: [{ type: 'blog' }],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      readOnly: readOnlyIfNotBaseLang,
      components: {
        field: localizationSlugField,
      },
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
        isUnique: isUniqueAcrossDocuments,
      },
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      description: 'Used in Featured Story card',
      type: 'richImage',
    }),
    defineField({
      name: 'navigationOverrides',
      type: 'navigationOverrides',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'headerArea',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'contentArea',
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
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
        subtitle: parentBlogTitle || '⚠ No parent blog',
        /* TODO: Add preview config that displays the publish date in the subtitle */
      };
    },
  },
});
