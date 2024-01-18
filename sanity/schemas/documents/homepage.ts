import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const Homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: icons.Home,
  fields: [
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'metadata',
    }),
    defineField({
      name: 'sampleSimpleRichText',
      title: 'Sample Simple Rich Text',
      type: 'simpleRichText',
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({ title: 'Homepage' }),
  },
});
