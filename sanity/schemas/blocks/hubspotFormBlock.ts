import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const HubspotFormBlock = defineType({
  name: 'hubspotFormBlock',
  title: 'Hubspot Form Block',
  type: 'object',
  icon: icons.Hubspot,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'form',
      title: 'Form',
      type: 'hubspotForm',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      header: 'header',
    },
    prepare: ({ header }) => ({
      title: 'Hubspot Form Block',
      subtitle: header?.title || null,
    }),
  },
});
