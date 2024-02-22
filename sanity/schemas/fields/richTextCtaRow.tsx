import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const RichTextCtaRow = defineType({
  name: 'richTextCtaRow',
  title: 'Rich Text CTAs',
  type: 'object',
  icon: icons.CTA,
  fields: [
    defineField({
      name: 'ctas',
      title: 'CTAs',
      type: 'array',
      of: [{ type: 'cta' }],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
  ],
  preview: {
    select: { ctas: 'ctas' },
    prepare: ({ ctas }) => {
      if (!ctas || ctas.length < 1) {
        return {
          title: '(empty)',
        };
      }
      const title = ctas
        .map((cta) => cta.label)
        .filter(Boolean)
        .join(', ');
      return { title };
    },
  },
});
