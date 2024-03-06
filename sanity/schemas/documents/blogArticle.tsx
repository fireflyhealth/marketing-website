import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { API_VERSION } from '../../lib/constants';
import { readOnlyIfNotBaseLang } from '../../lib/readOnlyIfNotBaseLang';
import localizationSlugField from '../../lib/localizationSlugField';
import { isUniqueAcrossDocuments } from '../../lib/isUniqueAcrossDocuments';
import { formatSanityDate } from '../../lib/utils';

export const BlogArticle = defineType({
  name: 'blogArticle',
  type: 'document',
  title: 'Blog Article',
  icon: icons.Article,
  fieldsets: [
    { title: 'Categorization', name: 'categorization' },
    { title: 'Linking', name: 'linking' },
    { title: 'Content', name: 'content' },
  ],
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
      description: 'Defaults to the date of the most recent update when empty',
      options: {
        dateFormat: 'MMMM DD, YYYY',
      },
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
          const blogArticleId = document._id.replace(/^drafts\./, '');
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
              && _id != $blogArticleId
              && !(_id in path("drafts.**"))
              && category._ref == $parentBlogId
              ]{
                _id,
                slug
              }`,
              { parentBlogId, blogArticleId },
            ),
          ]);
          const siblingSlugs = siblings.map((article) => article.slug.current);
          if (siblingSlugs.includes(currentSlug.current)) {
            return `There is already an article within the ${parentBlog.title} blog with the slug ${currentSlug.current}`;
          }
          return true;
        }),
      options: {
        source: 'title',
        isUnique: isUniqueAcrossDocuments,
      },
    }),
    defineField({
      name: 'navigationOverrides',
      title: 'Navigation Overrides',
      type: 'navigationOverrides',
    }),

    /* Categorization */
    defineField({
      name: 'category',
      fieldset: 'categorization',
      title: 'Parent Blog',
      type: 'reference',
      to: [{ type: 'blog' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      fieldset: 'categorization',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogArticleTag' }] }],
    }),

    /* Linking */
    defineField({
      name: 'thumbnail',
      fieldset: 'linking',
      title: 'Thumbnail',
      description: 'Used in Featured Story card',
      type: 'richImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blurb',
      fieldset: 'linking',
      title: 'Blurb',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    /* Content */
    defineField({
      name: 'header',
      fieldset: 'content',
      title: 'Header',
      type: 'headerArea',
    }),
    defineField({
      name: 'content',
      fieldset: 'content',
      title: 'Content Blocks',
      type: 'contentArea',
    }),

    /* Metadata */
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
      _updatedAt: '_updatedAt',
      publishDate: 'publishDate',
    },
    prepare: ({ parentBlogTitle, title, _updatedAt, publishDate }) => {
      const formattedDate = formatSanityDate(publishDate || _updatedAt);
      const parentBlog = parentBlogTitle || '⚠ No parent blog';
      const subtitle = [formattedDate, parentBlog].join(' | ');
      return {
        title,
        subtitle,
      };
    },
  },
});
