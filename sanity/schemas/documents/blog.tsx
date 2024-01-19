import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { readOnlyIfNotBaseLang } from '../../lib/readOnlyIfNotBaseLang';
import localizationSlugField from '../../lib/localizationSlugField';
import { isUniqueAcrossDocuments } from '../../lib/isUniqueAcrossDocuments';

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
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
});
