import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import idValidationRule from '../util/idValidationRule';

export const CTA = defineType({
  name: 'cta',
  type: 'object',
  title: 'CTA',
  icon: icons.CTA,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
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
      name: 'variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outlined', value: 'outlined' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
