import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const Homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: icons.Home,
  fields: [
    defineField({
      name: 'navigationOverrides',
      type: 'navigationOverrides',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'metadata',
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({ title: 'Homepage' }),
  },
});
