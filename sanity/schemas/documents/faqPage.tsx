import { defineArrayMember, defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const FAQGroup = defineType({
  name: 'faqGroup',
  title: 'FAQ Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'questions',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'faq' }] })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      questions: 'questions',
    },
    prepare: ({ title, questions }) => {
      return {
        title: title || '(empty)',
        subtitle: questions ? `${questions.length} questions` : undefined,
      };
    },
  },
});

export const FAQTab = defineType({
  name: 'faqTab',
  title: 'FAQ Tab',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faqGroups',
      title: 'Question Groups',
      type: 'array',
      of: [{ type: 'faqGroup' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      faqGroups: 'faqGroups',
    },
    prepare: ({ title, faqGroups }) => {
      const subtitle = faqGroups
        ? faqGroups.map((group) => group.title).join(', ')
        : undefined;
      return {
        title: title || '(empty)',
        subtitle,
      };
    },
  },
});

export const FAQPage = defineType({
  name: 'faqPage',
  type: 'document',
  title: 'FAQs',
  icon: icons.Question,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigationOverrides',
      type: 'navigationOverrides',
    }),
    defineField({
      name: 'faqTabs',
      title: 'FAQ Tabs',
      type: 'array',
      of: [defineArrayMember({ type: 'faqTab' })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'headerArea',
      title: 'Header',
      type: 'headerArea',
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
});
