import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';

export const OverlapDoubleImages = defineType({
  name: 'overlapDoubleImages',
  title: 'Overlap Double Images',
  type: 'object',
  icon: icons.OverlapDoubleImages,
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      validation: (Rule) => Rule.required().min(2).max(2),
      of: [
        defineArrayMember({
          type: 'richImageWithCaption',
        }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Overlap Double Images' }),
  },
});
