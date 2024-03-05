import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { richTextToString } from '../../lib/richTextToString';

export const FrequentlyAskedQuestion = defineType({
  name: 'faq',
  type: 'document',
  title: 'Frequently Asked Question',
  icon: icons.Question,
  fieldsets: [
    { name: 'grouping', title: 'Grouping' },
    { name: 'question', title: 'Question' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'subject',
      fieldset: 'grouping',
      title: 'Subject',
      type: 'reference',
      to: [{ type: 'faqSubject' }],
    }),
    defineField({
      name: 'category',
      fieldset: 'grouping',
      title: 'Category',
      type: 'string',
      initialValue: 'For Individuals',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'For Individuals', value: 'For Individuals' },
          { title: 'For Providers', value: 'For Providers' },
        ],
      },
    }),
    defineField({
      name: 'question',
      fieldset: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      fieldset: 'question',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'question',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      fieldset: 'question',
      title: 'Answer',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hiddenOnFaqPage',
      fieldset: 'settings',
      title: 'Hide on FAQ page',
      type: 'boolean',
      initialValue: false,
      description:
        'Enable this option if you would like to link to this question in an FAQ block, but do not want it to appear on the main FAQ page.',
    }),
  ],
  preview: {
    select: {
      question: 'question',
      answer: 'answer',
      category: 'category',
      subject: 'subject.title',
    },
    // For some reason adding a dot 'subject.subjectName' in the select
    // config breaks the typing here
    // @ts-ignore
    prepare: ({ question, answer, category, subject }) => {
      const subtitle = [
        category,
        subject,
        answer ? richTextToString(answer) : undefined,
      ]
        .filter(Boolean)
        .join(' | ');
      return {
        title: question || '(empty)',
        subtitle,
        icon: icons.Question,
      };
    },
  },
});
