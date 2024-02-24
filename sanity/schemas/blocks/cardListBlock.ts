import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

// CardListBlock and DrawerListBlock share the same fields
// but have render different styles based on sreen size

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
      name: 'drawerListItems',
      type: 'array',
      of: [{ type: 'drawerListItem' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      subtitle: 'cardListItems',
    },
    prepare: ({ subtitle }) => {
      return {
        title: 'Card List Block',
        subtitle: `${subtitle.length} Card(s)`,
      };
    },
  },
});
