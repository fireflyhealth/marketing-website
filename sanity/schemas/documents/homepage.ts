import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { createDocumentVariantField } from '../../plugins/documentVariants/fields/documentVariant';

export const Homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: icons.Home,
  fields: [
    createDocumentVariantField(),
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
      name: 'subnav',
      title: 'Render Subnav',
      type: 'boolean',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'contentArea',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'metadata',
    }),
  ],
  preview: {
    select: {
      documentVariantInfo: 'documentVariantInfo',
    },
    prepare: ({ documentVariantInfo }) => {
      const title = [documentVariantInfo?.variantOf ? '🅱️' : null, 'Homepage']
        .filter(Boolean)
        .join(' ');

      return { title };
    },
  },
});
