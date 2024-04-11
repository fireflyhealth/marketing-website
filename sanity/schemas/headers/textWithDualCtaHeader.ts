import { defineType, defineField, defineArrayMember } from 'sanity';
import idValidationRule from '../util/idValidationRule';

const CtaCardFields = [
  defineField({
    name: 'image',
    title: 'Image',
    type: 'responsiveImageSet',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
  }),
  defineField({
    name: 'label',
    title: 'Label',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'ariaLabel',
    type: 'string',
    title: 'Aria Label',
    description:
      'Optional. Provide an Aria Label when the button\'s text label does not convey its function adequately or if the label is too generic. For example: a button with the label "OK" should be given an Aria Label such as "Accept terms & conditions"',
  }),
  defineField({
    name: 'id',
    type: 'string',
    title: 'ID',
    description: 'Used for tracking in analytics',
    validation: idValidationRule,
  }),
  defineField({
    name: 'link',
    type: 'link',
    title: 'Link',
    validation: (Rule) => Rule.required(),
  }),
  defineType({
    name: 'theme',
    title: 'Theme',
    type: 'string',
    initialValue: 'sienna',
    options: {
      list: [
        { title: 'Sienna', value: 'sienna' },
        { title: 'Midnight', value: 'midnight' },
      ],
    },
    validation: (Rule) => Rule.required(),
  }),
];

export const TextWithDualCtaHeader = defineType({
  name: 'textWithDualCtaHeader',
  title: 'Text with Dual CTA Header',
  type: 'object',
  fields: [
    defineField({
      name: 'theme',
      type: 'theme',
      title: 'Theme',
      initialValue: 'white',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
    }),
    defineField({
      title: 'CTAs',
      name: 'ctas',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'CTA',
          name: 'cta',
          type: 'cta',
        }),
      ],
    }),
    defineField({
      title: 'Top CTA Card',
      name: 'topCta',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: CtaCardFields,
    }),
    defineField({
      title: 'Bottom CTA Card',
      name: 'bottomCta',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: CtaCardFields,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => {
      return {
        title: 'Text with Dual CTA Header',
        subtitle: title,
      };
    },
  },
});
