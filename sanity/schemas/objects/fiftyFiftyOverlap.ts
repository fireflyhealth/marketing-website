import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const FiftyFiftyOverlap = defineType({
  name: 'fiftyFiftyOverlap',
  title: '50/50 Overlap',
  icon: icons.Component,
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'componentHeader',
    }),
  ],
  preview: {
    prepare: () => {
      return {
        title: '50/50 Overlap',
      };
    },
  },
});
