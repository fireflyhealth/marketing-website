import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const Footnotes = defineType({
  name: 'footnotes',
  title: 'Footnotes',
  type: 'object',
  icon: icons.Footnotes,
  fields: [
    defineField({
      name: 'footnotes',
      title: 'Footnotes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      footnotes: 'footnotes',
    },
    prepare: ({ footnotes }) => {
      return {
        title: 'Footnotes',
        subtitle: `${footnotes.length} footnote(s)`,
      };
    },
  },
});
