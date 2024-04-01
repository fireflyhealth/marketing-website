import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const ProviderPhilosophyBlock = defineType({
  name: 'providerPhilosophyBlock',
  title: 'Provider Philosophy Block',
  type: 'object',
  icon: icons.Quote,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'icon',
      type: 'icon',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Provider Philosophy Block',
      };
    },
  },
});
