import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const Homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: icons.Home,
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({ title: 'Homepage' }),
  },
});
