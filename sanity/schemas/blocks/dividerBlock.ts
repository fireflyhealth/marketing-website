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
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      borderBottom: 'borderBottom',
    },
    prepare: ({ borderBottom }) => ({
      title: 'Divider Block',
      subtitle: `Border bottom: ${borderBottom}`,
    }),
  },
});
