import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const FAQSubject = defineType({
  name: 'faqSubject',
  title: 'FAQ Subject',
  type: 'document',
  icon: icons.Question,
  fields: [
    defineField({
      name: 'title',
      title: 'Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'subjectName',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
