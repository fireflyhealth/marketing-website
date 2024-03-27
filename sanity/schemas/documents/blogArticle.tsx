import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { API_VERSION } from '../../lib/constants';
import { readOnlyIfNotBaseLang } from '../../lib/readOnlyIfNotBaseLang';
import localizationSlugField from '../../lib/localizationSlugField';
import { isUniqueAcrossDocuments } from '../../lib/isUniqueAcrossDocuments';
import { formatSanityDate } from '../../lib/utils';
import { createDocumentVariantField } from '../../plugins/documentVariants/fields/documentVariant';
import { cloneWithUniqueSlug } from '../../plugins/documentVariants/utils';

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
    createDocumentVariantField({
      cloneOptions: {
        getCloneData: cloneWithUniqueSlug,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'articleImage',
      title: 'Article Image',
      description:
        'Used in article header if image is provided. Otherwise, article header will render without image.',
      type: 'richImage',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      description:
        'Defaults to the date of the document created date. If this field is set, it will be used as the publish date.',
      options: {
        dateFormat: 'MMMM DD, YYYY',
      },
    }),
    defineField({
      name: 'updatedDate',
      title: 'Updated Date',
      type: 'date',
      description:
        'Defaults to the document updated date. If this field is set, it will be used as the updated date.',
      options: {
        dateFormat: 'MMMM DD, YYYY',
      },
    }),
    defineField({
      name: 'authorName',
      title: 'author Name',
      type: 'string',
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
          const siblingSlugs = siblings
            .filter((article) => article.slug?.current)
            .map((article) => article.slug.current);
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
      options: {
        filter: 'defined(documentVariantInfo.variantDocument)',
      },
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
      name: 'deck',
      fieldset: 'content',
      title: 'Deck',
      type: 'simpleRichText',
    }),
    defineField({
      name: 'content',
      fieldset: 'content',
      title: 'Content',
      type: 'articleRichText',
      validation: (Rule) => Rule.required(),
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
      documentVariantInfo: 'documentVariantInfo',
      parentBlogTitle: 'category.title',
      title: 'title',
      _updatedAt: '_updatedAt',
      thumbnail: 'thumbnail',
      publishDate: 'publishDate',
    },
    prepare: ({
      documentVariantInfo,
      thumbnail,
      parentBlogTitle,
      title,
      _updatedAt,
      publishDate,
    }) => {
      const formattedDate = formatSanityDate(publishDate || _updatedAt);
      const parentBlog = parentBlogTitle || '⚠ No parent blog';
      const subtitle = [formattedDate, parentBlog].filter(Boolean).join(' | ');
      const fullTitle = [documentVariantInfo?.variantOf ? '🅱️' : '🅰️', title]
        .filter(Boolean)
        .join(' ');
      return {
        title: documentVariantInfo ? fullTitle : title,
        subtitle: documentVariantInfo ? `🅰️/🅱️ ${subtitle}` : subtitle,
        media: thumbnail,
      };
    },
  },
});
