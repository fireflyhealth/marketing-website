import { defineType, defineField } from 'sanity';
import { richTextToString } from '../../lib/richTextToString';
import { Maybe } from '../../lib/types';
import { icons } from '../../lib/icons';

type BigNumberData = {
  unit: Maybe<{
    unitValue?: string;
    position?: 'before' | 'after';
  }>;
  value: number;
};

const getBigNumberPreviewTitle = (bigNumber: Maybe<BigNumberData>) => {
  if (!bigNumber?.value) {
    return '(empty)';
  }
  const { unit, value } = bigNumber;
  const formattedValue = value.toLocaleString('en-US');
  if (!unit) return formattedValue;
  const { unitValue, position } = unit;
  if (!unitValue || !position) {
    return formattedValue;
  }
  const title =
    position === 'before'
      ? unitValue.concat(formattedValue)
      : formattedValue.concat(unitValue);
  return title;
};

export const BigNumber = defineType({
  name: 'bigNumber',
  title: 'Big Number',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      type: 'number',
      title: 'Value',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unit',
      type: 'object',
      title: 'Unit',
      fields: [
        defineField({
          name: 'unitValue',
          type: 'string',
          title: 'Value',
          description: 'i.e. "$" or "%"',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              // @ts-ignore
              if (context?.parent?.position && !value) {
                return 'Required when a Position is selected';
              }
              return true;
            }),
        }),
        defineField({
          name: 'position',
          title: 'Position',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((value, context) => {
              // @ts-ignore
              if (context?.parent?.unitValue && !value) {
                return 'Required when a Unit Value is present';
              }
              return true;
            }),

          options: {
            list: [
              { title: 'Before', value: 'before' },
              { title: 'After', value: 'after' },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'description',
      type: 'simpleRichText',
      title: 'Description',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      unit: 'unit',
      value: 'value',
      description: 'description',
    },
    prepare: ({ unit, value, description }) => {
      const title = getBigNumberPreviewTitle({ unit, value });
      return { title, subtitle: richTextToString(description) };
    },
  },
});

export const BigNumbers = defineType({
  name: 'bigNumbers',
  type: 'object',
  icon: icons.Percentage,
  fields: [
    defineField({
      name: 'bigNumbers',
      type: 'array',
      of: [{ type: 'bigNumber' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      bigNumbers: 'bigNumbers',
    },
    prepare: ({ bigNumbers }) => {
      if (!bigNumbers) {
        return { title: '(empty)' };
      }
      const firstBigNumberTitle = getBigNumberPreviewTitle(bigNumbers[0]);
      const firstBigNumberDescription = bigNumbers[0]?.description
        ? richTextToString(bigNumbers[0].description)
            .split(' ')
            .slice(0, 4)
            .join(' ')
            .concat('...')
        : undefined;

      const title = [firstBigNumberTitle, firstBigNumberDescription].join(' ');
      const subtitle =
        bigNumbers.length > 1 ? `+ ${bigNumbers.length - 1} more` : undefined;

      return {
        title,
        subtitle,
      };
    },
  },
});
