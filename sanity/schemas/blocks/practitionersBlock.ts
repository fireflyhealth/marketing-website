import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const PractitionersBlock = defineType({
  name: 'practitionersBlock',
  title: 'Practitioners Block',
  type: 'object',
  icon: icons.Practitioner,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'practitioners',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'practitioner' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      header: 'header',
    },
    prepare: ({ header }) => ({
      title: 'Practitioners block',
      subtitle: header?.title,
    }),
  },
});
