import { defineType, defineField } from 'sanity';

const sharedFields = [
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'label',
    title: 'Label',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'link',
    title: 'Link',
    type: 'link',
  }),
  defineField({
    name: 'ariaLabel',
    type: 'string',
    title: 'Aria Label',
    description:
      'Optional. Provide an Aria Label when the button\'s text label does not convey its function adequately or if the label is too generic. For example: a button with the label "OK" should be given an Aria Label such as "Accept terms & conditions"',
  }),
];

export const DoubleCta = defineType({
  name: 'doubleCta',
  title: 'Double CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'ctaOne',
      title: 'CTA One',
      type: 'object',
      fields: [...sharedFields],
    }),
    defineField({
      name: 'ctaTwo',
      title: 'CTA Two',
      type: 'object',
      fields: [...sharedFields],
    }),
  ],
});
