import { defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { DrawerListBlockFields } from './drawerListBlock';

// CardListBlock and DrawerListBlock share the same fields
// but have render different styles based on sreen size

export const CardListBlock = defineType({
  name: 'cardListBlock',
  title: 'Card List Block',
  type: 'object',
  icon: icons.Cards,
  fields: DrawerListBlockFields,
  preview: {
    select: {
      subtitle: 'header',
    },
    prepare: ({ subtitle }) => {
      return {
        title: 'Card List Block',
        subtitle: subtitle?.title,
      };
    },
  },
});
