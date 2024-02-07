import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const HubspotForm = defineType({
  name: 'hubspotForm',
  title: 'Hubspot Form',
  type: 'object',
  icon: icons.Hubspot,
  fields: [
    defineField({
      name: 'formId',
      title: 'Form ID',
      type: 'string',
      description: 'Paste in the Hubspot form ID you wish to connect.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Hubspot Form' }),
  },
});
