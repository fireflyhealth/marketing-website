import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const DividerBlock = defineType({
  name: 'dividerBlock',
  title: 'Divider Block',
  type: 'object',
  icon: icons.Divider,
  fields: [
    defineField({
      name: 'borderBottom',
      title: 'Border Bottom',
      type: 'boolean',
    }),
    defineField({
      name: 'borderTop',
      title: 'Border Top',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {
      borderBottom: 'borderBottom',
      borderTop: 'borderTop',
    },
    prepare: ({ borderBottom, borderTop }) => ({
      title: 'Divider Block',
      subtitle: `Border bottom: ${borderBottom} | Border top: ${borderTop}`,
    }),
  },
});
