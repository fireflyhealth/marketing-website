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
        'The ID of the content block to scroll to when this item is clicked',
      validation: idValidationRule,
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
