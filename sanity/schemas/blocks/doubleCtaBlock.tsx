import { defineType, defineField } from 'sanity';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const DoubleCtaBlock = defineType({
  name: 'doubleCtaBlock',
  title: '2-up Big CTA Block',
  type: 'object',
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'doubleCta',
      type: 'doubleCta',
    }),
  ],
  preview: {
    select: {
      header: 'header',
      doubleCta: 'doubleCta',
    },
    prepare: ({ header, doubleCta }) => ({
      title: '2-up Big CTA Block',
      subtitle:
        header?.title ||
        `CTA One: ${doubleCta?.ctaOne?.label} | CTA Two: ${doubleCta?.ctaTwo?.label}`,
    }),
  },
});
