import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const BarGraphItems = defineType({
  title: 'Bar Graph',
  name: 'barGraphItems',
  type: 'object',
  icon: icons.BarGraph,
  fields: [
    defineField({
      name: 'barOne',
      title: 'Bar 1',
      type: 'object',
      description: 'This bar represents Firefly.',
      fields: [
        defineField({
          name: 'unit',
          title: 'Unit',
          description:
            'This value will always render as a percentage (ex. 70%)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          description: 'Short description of this unit (ex. `Firefly`)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'barTwo',
      title: 'Bar 2',
      type: 'object',
      description: 'This bar represents the Industry Standard.',
      fields: [
        defineField({
          name: 'unit',
          title: 'Unit',
          description:
            'This value will always render as a percentage (ex. 49%)',
          type: 'number',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          description:
            'Short description of this unit (ex. `Industry Standard`)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      barOne: 'barOne',
      barTwo: 'barTwo',
    },
    prepare: ({ barOne, barTwo }) => {
      const summaryOne = barOne
        ? [
            barOne.description?.concat(':'),
            barOne.unit?.toString().concat('%'),
          ].join(' ')
        : undefined;
      const summaryTwo = barTwo
        ? [
            barTwo.description?.concat(':'),
            barTwo.unit?.toString().concat('%'),
          ].join(' ')
        : undefined;
      const subtitle = [summaryOne, summaryTwo].filter(Boolean).join(' | ');
      return {
        title: 'Bar Graph',
        subtitle,
      };
    },
  },
});
