import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const ReviewItem = defineType({
  name: 'reviewItem',
  title: 'Review Item',
  type: 'object',
  icon: icons.Reviews,
  fields: [
    defineField({
      name: 'starRating',
      title: 'Star Rating',
      type: 'number',
      options: {
        list: [
          { title: '1 star', value: 1 },
          { title: '2 stars', value: 2 },
          { title: '3 stars', value: 3 },
          { title: '4 stars', value: 4 },
          { title: '5 stars', value: 5 },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviewer',
      title: 'Reviewer',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'age',
          title: 'Age',
          type: 'number',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'MMMM DD, YYYY',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'reviewer.name',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle,
    }),
  },
});

export const ReviewBlock = defineType({
  name: 'reviewBlock',
  title: 'Review Block',
  type: 'object',
  icon: icons.Reviews,
  fields: [
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'reviewItem' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Review Block',
    }),
  },
});
