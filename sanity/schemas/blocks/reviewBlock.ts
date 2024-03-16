import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const ReviewHeading = defineType({
  name: 'reviewHeading',
  title: 'Review Heading',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichText',
    }),
  ],
});

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
      name: 'reviewQuote',
      title: 'Review',
      type: 'quoteObject',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'MMMM DD, YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      reviewQuote: 'reviewQuote',
      badgeImage: 'badgeImage',
    },
    prepare: ({ title, reviewQuote, badgeImage }) => {
      const attribution = reviewQuote?.attribution;
      const subtitle = [attribution?.label, attribution?.labelSubtitle]
        .filter(Boolean)
        .join(' - ');
      return {
        title,
        subtitle,
        media: badgeImage,
      };
    },
  },
});

export const ReviewBlock = defineType({
  name: 'reviewBlock',
  title: 'Review Block',
  type: 'object',
  icon: icons.Reviews,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'reviewHeading',
      type: 'reviewHeading',
      title: 'Review Heading',
      description: 'Required heading that displays inside of the component.',
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
