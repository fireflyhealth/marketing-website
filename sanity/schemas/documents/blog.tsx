import { defineArrayMember, defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { readOnlyIfNotBaseLang } from '../../lib/readOnlyIfNotBaseLang';
import localizationSlugField from '../../lib/localizationSlugField';
import { isUniqueAcrossDocuments } from '../../lib/isUniqueAcrossDocuments';

export const BlogArticleTagGroup = defineType({
  name: 'blogArticleTagGroup',
  title: 'Article Tag Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'reference',
      to: [{ type: 'blogArticleTag' }],
    }),
  ],
});

export const Blog = defineType({
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fieldsets: [{ name: 'content', title: 'Content' }],
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
      readOnly: readOnlyIfNotBaseLang,
      components: {
        field: localizationSlugField,
      },
      options: {
        source: 'title',
        isUnique: isUniqueAcrossDocuments,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigationOverrides',
      type: 'navigationOverrides',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      fieldset: 'content',
      type: 'headerArea',
    }),
    defineField({
      name: 'contentArea',
      title: 'Content Area',
      fieldset: 'content',
      type: 'contentArea',
      description: 'Appears above the article thumbnails',
    }),
    defineField({
      name: 'featuredArticle',
      fieldset: 'content',
      title: 'Featured Article',
      type: 'reference',
      options: {
        filter: ({ document }) => {
          const documentId = document._id.replace(/^drafts\./, '');
          return {
            filter: 'category->_id == $id',
            params: { id: documentId },
          };
        },
      },
      to: [{ type: 'blogArticle' }],
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          /* Not required */
          const document = context.document;
          if (!value || !document) return true;
          /* If there is a reference, validate that it is assigned
           * to the current blog.
           *
           * The filter in the above options.filter configuration will
           * ensure that the selected article will be within this blog,
           * but it is possible that the article's category could be
           * changed and it would no longer be valid. */
          const client = context.getClient({ apiVersion: '2024-01-01' });
          const article = await client.fetch(
            `*[_type == "blogArticle" && _id == $id]{
              category->{
                _id,
                title
              }
            }[0]`,
            { id: value._ref },
          );

          if (article.category._id !== document._id.replace(/^drafts\./, '')) {
            return `Featured articles must be assigned to this blog. The linked article is assigned to the "${article.category.title}" blog.`;
          }
          return true;
        }),
    }),

    defineField({
      name: 'allArticlesLabel',
      title: 'All Articles label',
      type: 'string',
      initialValue: 'All Articles',
      description:
        'Populates the tab label for viewing all articles in this blog.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blogArticleTagGroups',
      title: 'Article Tag Groups',
      fieldset: 'content',
      description:
        'Optional. Add entries to create Tabs that group articles filtered by a tag.',
      type: 'array',
      of: [defineArrayMember({ type: 'blogArticleTagGroup' })],
    }),
    defineField({
      name: 'articleLayout',
      title: 'Article Layout',
      fieldset: 'content',
      type: 'string',
      initialValue: 'grid',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' },
        ],
      },
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
});
