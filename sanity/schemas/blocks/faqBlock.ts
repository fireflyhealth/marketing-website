import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const FAQBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ Block',
  type: 'object',
  icon: icons.Question,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      initialValue: 'white',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blockTitle',
      title: 'Block Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'blockDescription',
      title: 'Description',
      type: 'simpleRichText',
    }),
    defineField({
      name: 'blockCta',
      title: 'CTA',
      type: 'cta',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'faq' }] })],
    }),
  ],
  preview: {
    select: {
      header: 'header',
      blockTitle: 'blockTitle',
      faqs: 'faqs',
    },
    prepare: ({ header, blockTitle, faqs }) => {
      const subtitle = [
        header?.title,
        blockTitle,
        faqs?.length ? `${faqs.length} FAQs` : undefined,
      ]
        .filter(Boolean)
        .join(' | ');
      return {
        title: 'FAQ Block',
        subtitle,
        icon: icons.Question,
      };
    },
  },
});
