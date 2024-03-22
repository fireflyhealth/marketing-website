import {
  defineField,
  defineType,
  useClient,
  useFormValue,
  SanityDocument,
} from 'sanity';
import { useState, useEffect } from 'react';

import { icons } from '../../lib/icons';
import { richTextToString } from '../../lib/richTextToString';
import { API_VERSION } from '../../lib/constants';
import { Status } from '../../lib/types';

type State =
  | {
      status: Status.Idle;
    }
  | {
      status: Status.Pending;
    }
  | {
      status: Status.Fulfilled;
      url: string;
    }
  | {
      status: Status.Rejected;
      errorMessage: string;
    };

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
      title: 'Faq URL',
      name: 'faqUrl',
      fieldset: 'settings',
      type: 'string',
      components: {
        input: () => {
          const [state, setState] = useState<State>({ status: Status.Idle });

          const client = useClient({ apiVersion: API_VERSION });
          const parentDocument = useFormValue([]) as SanityDocument;
          const parentCategoryId = parentDocument.category?._ref;
          const faqSlug = parentDocument.slug?.current;

          const getUrl = async () => {
            if (state.status === Status.Fulfilled) return;

            if (!faqSlug || !parentCategoryId) {
              setState({
                status: Status.Rejected,
                errorMessage: 'must have category and slug',
              });
            }

            const category = await client.fetch(
              '*[_type=="faqCategory" && _id == $id][0]{ slug }',
              { id: parentCategoryId },
            );
            const categorySlug = category?.slug?.current;
            const url = `https://www.fireflyhealth.com/faq?category=${categorySlug}&faq=${faqSlug}`;
            setState({ status: Status.Fulfilled, url });
          };

          useEffect(() => {
            getUrl();
          }, [parentCategoryId, faqSlug]);

          if (Status.Idle === state.status || Status.Pending === state.status) {
            return <p>Loading...</p>;
          }

          if (state.status === Status.Rejected) {
            return <p>{state.errorMessage}</p>;
          }

          const url = state?.url;
          return (
            <div>
              Your URL:
              <pre>{url}</pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(url);
                }}
              >
                Copy url
              </button>
            </div>
          );
        },
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
