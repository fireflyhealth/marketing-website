import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const CardListBlock = defineType({
  name: 'cardListBlock',
  title: 'Card List Block',
  type: 'object',
  icon: icons.Cards,
  fields: [
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
    }),
    defineField({
      name: 'cardList',
      title: 'Card list',
      type: 'array',
      of: [{ type: 'card' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      subtitle: 'cardList',
    },
    prepare: ({ subtitle }) => {
      return {
        title: 'Card List Block',
        subtitle: `${subtitle.length} Card(s)`,
      };
    },
  },
});
