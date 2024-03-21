import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { richTextToString } from '../../lib/richTextToString';
import { API_VERSION } from '../../lib/constants';

async function faqSlugifyer(input, _schemaType, context) {
  const { getClient } = context;
  const client = getClient({ apiVersion: API_VERSION });
  const query = `*[_type=="faq" && _id == $id][0]{ slug, category -> { slug }, subject -> { slug }}`;
  const params = { id: input };
  const url = client.fetch(query, params).then((fields) => {
    const { slug, category, subject } = fields;

    const categorySlug = category?.slug?.current;
    const subjectSlug = subject?.slug?.current;
    const faqSlug = slug?.current;

    if (!categorySlug || !subjectSlug || !faqSlug) {
      return undefined;
    }

    return `/faq?category=${categorySlug}&subject=${subjectSlug}&faq=${faqSlug}`;
  });

  return url;
}

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
      type: 'reference',
      to: [{ type: 'faqCategory' }],
      validation: (Rule) => Rule.required(),
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
    defineField({
      title: 'Linkable URL',
      name: 'linkableUrl',
      fieldset: 'settings',
      type: 'slug',
      description:
        'You must generate linked category and subject slugs and faq slug first. \n Only use generated url, url will not work if you modify.',
      options: {
        source: '_id',
        slugify: faqSlugifyer,
      },
    }),
  ],
  preview: {
    select: {
      question: 'question',
      answer: 'answer',
      category: 'category.title',
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
