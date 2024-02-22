import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import idValidationRule from '../util/idValidationRule';

export const SubnavItem = defineField({
  name: 'subnavItem',
  title: 'Subnav Item',
  type: 'object',
  fields: [
    defineField({
      name: 'contentBlockId',
      title: 'Content Block ID',
      type: 'string',
      description:
        'The ID of the content block to scroll to when this item is clicked. This must match the ID of the corresponding content block.',
      validation: idValidationRule,
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
  ],
});

export const Subnav = defineType({
  name: 'subnav',
  type: 'array',
  title: 'Sub Navigation',
  icon: icons.CTA,
  of: [
    defineField({
      name: 'subnavItem',
      title: 'Subnav Item',
      type: 'subnavItem',
    }),
  ],
});
