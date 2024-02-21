import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { readOnlyIfNotBaseLang } from '../../lib/readOnlyIfNotBaseLang';
import localizationSlugField from '../../lib/localizationSlugField';
import { isUniqueAcrossDocuments } from '../../lib/isUniqueAcrossDocuments';

export const ClientPage = defineType({
  name: 'clientPage',
  type: 'document',
  title: 'Client Page',
  icon: icons.Client,
  fields: [
    defineField({
      title: 'Client Name',
      name: 'clientName',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      readOnly: readOnlyIfNotBaseLang,
      components: {
        field: localizationSlugField,
      },
      validation: (Rule) => Rule.required(),
      options: {
        source: 'clientName',
        isUnique: isUniqueAcrossDocuments,
      },
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
      name: 'subnab',
      title: 'Subnavigation',
      type: 'subnav',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'contentArea',
    }),
    defineField({
      title: 'Metadata',
      name: 'metadata',
      type: 'metadata',
    }),
  ],
  preview: {
    select: { clientName: 'clientName' },
    prepare: ({ clientName }) => ({ title: clientName }),
  },
});
