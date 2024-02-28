import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

/**
 * Content blocks that are used as children within
 * the 2-up block.
 */
const childContentBlockTypes = [
  { type: 'richTextChildBlock' },
  { type: 'bigNumber' },
];
const sharedFields = [
  defineField({
    name: 'columnCount',
    title: 'Column Count',
    description: '(desktop only)',
    initialValue: 4,
    type: 'number',
    options: {
      layout: 'radio',
      direction: 'horizontal',
      list: [
        { title: '4', value: 4 },
        { title: '3', value: 3 },
        { title: '2', value: 2 },
      ],
    },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'theme',
    title: 'Theme',
    type: 'theme',
    initialValue: 'white',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'content',
    type: 'array',
    of: childContentBlockTypes,
    validation: (Rule) => Rule.required(),
  }),
];

export const ColumnsObject = defineType({
  name: 'columsObject',
  title: 'Columns',
  type: 'object',
  fields: [...sharedFields],
  preview: {
    select: {
      columnCount: 'columnCount',
      content: 'content',
    },
    prepare: ({ columnCount }) => {
      const subtitle = `${columnCount} columns`;
      return {
        title: 'Columns Block',
        subtitle,
        icon: icons.Columns,
      };
    },
  },
});

export const ColumnsBlock = defineType({
  name: 'columnsBlock',
  title: 'Columns Block',
  type: 'object',
  icon: icons.Columns,
  fields: [...requiredBlockFields, ...sharedFields],
  preview: {
    select: {
      header: 'header',
      columnCount: 'columnCount',
      content: 'content',
    },
    prepare: ({ header, columnCount }) => {
      const subtitle = [header?.title, `${columnCount} columns`]
        .filter(Boolean)
        .join(' | ');
      return {
        title: 'Columns Block',
        subtitle,
        icon: icons.Columns,
      };
    },
  },
});
