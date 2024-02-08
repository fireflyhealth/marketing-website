import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

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
    name: 'id',
    type: 'string',
    title: 'ID',
    description: 'Used for tracking in analytics',
    validation: (Rule) =>
      Rule.custom((value?: string) => {
        if (!value) return 'Required';
        if (value.toLowerCase() !== value) {
          return 'Must be all lowercase';
        }
        if (!/^([A-Za-z0-9-_])+$/.test(value)) {
          return 'Can only be letters, numbers, hyphens, and underscores (no spaces or special characters)';
        }
        return true;
      }),
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
  icon: icons.DoubleCTA,
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
  preview: {
    prepare: () => ({ title: 'Double CTA Block' }),
  },
});
