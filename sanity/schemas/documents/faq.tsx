import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { richTextToString } from '../../lib/richTextToString';

export const FrequentlyAskedQuestion = defineType({
  name: 'faq',
  type: 'document',
  title: 'Frequently Asked Question',
  icon: icons.Question,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'question',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      question: 'question',
      answer: 'answer',
    },
    prepare: ({ question, answer }) => {
      return {
        title: question || '(empty)',
        subtitle: answer ? richTextToString(answer) : undefined,
        icon: icons.Question,
      };
    },
  },
});
