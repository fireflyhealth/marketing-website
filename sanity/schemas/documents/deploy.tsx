import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const Deploy = defineType({
  name: 'deploy',
  title: 'Deploy',
  type: 'document',
  icon: icons.Deploy,
  fields: [
    defineField({
      title: 'Deploy Request Datetime',
      name: 'deployRequestDatetime',
      type: 'datetime',
      description:
        'In order to request a deploy with updated CMS content, update this field to current datetime and publish the document.',
    }),
  ],
  preview: {
    select: {
      deployRequestDatetime: 'deployRequestDatetime',
    },
    prepare: ({ deployRequestDatetime }) => {
      return { title: `requested at: ${deployRequestDatetime}` };
    },
  },
});
