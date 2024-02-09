import { defineType, defineField } from 'sanity';
import { richTextToString } from '../../lib/richTextToString';

type BigNumberData = {
  numberType: 'percentage' | 'dollar' | 'none';
  value: number;
};

const getBigNumberPreviewTitle = ({ numberType, value }: BigNumberData) => {
  const formattedValue = value.toLocaleString('en-US');
  const title =
    numberType === 'percentage'
      ? `${formattedValue}%`
      : numberType === 'dollar'
        ? `$${formattedValue}`
        : formattedValue;
  return title;
};

export const BigNumber = defineType({
  name: 'bigNumber',
  title: 'Big Number',
  type: 'object',
  fields: [
    defineField({
      name: 'numberType',
      type: 'string',
      title: 'Number Type',
      initialValue: 'none',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Percentage (%)', value: 'percentage' },
          { title: 'Dollar amount ($)', value: 'dollar' },
        ],
      },
    }),
    defineField({
      name: 'value',
      type: 'number',
      title: 'Value',
      validation: (Rule) => Rule.required(),
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
      numberType: 'numberType',
      value: 'value',
      description: 'description',
    },
    prepare: ({ numberType, value, description }) => {
      const title = getBigNumberPreviewTitle({ numberType, value });
      return { title, subtitle: richTextToString(description) };
    },
  },
});

export const BigNumbers = defineType({
  name: 'bigNumbers',
  type: 'object',
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
