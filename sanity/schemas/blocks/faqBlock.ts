import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';

export const FAQBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ Block',
  type: 'object',
  icon: icons.Question,
  fields: [
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
    }),
    defineField({
      name: 'blockTitle',
      title: 'Block Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
