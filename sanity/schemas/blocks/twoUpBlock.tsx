import { defineType, defineField } from 'sanity';

import { icons } from '../../lib/icons';
import { camelCaseToSentence } from '../../lib/utils';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const getSharedFields = (
  isHeader?: boolean,
  childContentBlockTypes?: { type: string }[],
) => {
  const sharedLayoutOptions = [
    { title: 'Normal 50/50', value: 'normal-50-50' },
    { title: 'Overlap 50/50', value: 'overlap-50-50' },
  ];
  const layoutOptions = isHeader
    ? sharedLayoutOptions
    : [
        { title: 'Normal 60/40', value: 'normal-60-40' },
        { title: 'Normal 40/60', value: 'normal-40-60' },
        ...sharedLayoutOptions,
      ];
  const normalLayoutThemeFields = isHeader
    ? []
    : [
        defineField({
          name: 'normalLayoutTheme',
          title: 'Theme',
          type: 'theme',
          /* Only show these fields when a normal option is selected */
          hidden: (context) => {
            return Boolean(context.parent.layout === 'overlap-50-50');
          },
        }),
      ];
  const childContentBlockFields =
    isHeader && childContentBlockTypes
      ? [
          defineField({
            name: 'blockOne',
            title: 'Block One',
            type: 'array',
            of: childContentBlockTypes,
          }),
          defineField({
            name: 'blockTwo',
            title: 'Block Two',
            type: 'array',
            of: childContentBlockTypes,
          }),
        ]
      : [
          defineField({
            name: 'blockOne',
            title: 'Block One',
            type: 'childContentBlock',
          }),
          defineField({
            name: 'blockTwo',
            title: 'Block Two',
            type: 'childContentBlock',
          }),
        ];

  return [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: isHeader ? 'overlap-50-50' : 'normal-50-50',
      validation: (Rule) => Rule.required(),
      options: {
        list: layoutOptions,
      },
    }),
    defineField({
      name: 'mobileReverseBlockOrder',
      title: '(Mobile) Reverse block order',
      type: 'boolean',
    }),
    ...normalLayoutThemeFields,
    defineField({
      name: 'blockThemes',
      title: 'Block Themes',
      type: 'object',
      /* Only show these fields when the Overlap 50/50 option is selected */
      hidden: (context) => {
        return Boolean(context.parent.layout !== 'overlap-50-50');
      },
      fields: [
        defineField({
          name: 'blockOneTheme',
          type: 'theme',
          title: 'Block One Theme',
          initialValue: 'white',
        }),
        defineField({
          name: 'blockTwoTheme',
          type: 'theme',
          title: 'Block Two Theme',
          initialValue: 'white',
        }),
      ],
    }),
    ...childContentBlockFields,
  ];
};

export const TwoUpObject = defineType({
  name: 'twoUpObject',
  title: '2-up Content Block',
  type: 'object',
  icon: icons.TwoUp,
  fields: [...getSharedFields()],
  preview: {
    select: {
      blockOne: 'blockOne',
      blockTwo: 'blockTwo',
    },
    prepare: ({ blockOne, blockTwo }) => {
      const subtitle =
        [blockOne && blockOne[0], blockTwo && blockTwo[0]]
          .filter(Boolean)
          .map((block) => block._type)
          .map(camelCaseToSentence)
          .join(', ') || '(empty)';
      return {
        title: '2-up Block',
        subtitle,
      };
    },
  },
});

export const TwoUpBlock = defineType({
  name: 'twoUpBlock',
  title: '2-up Content Block',
  type: 'object',
  icon: icons.TwoUp,
  fields: [...requiredBlockFields, ...getSharedFields()],
  preview: {
    select: {
      header: 'header',
      blockOne: 'blockOne',
      blockTwo: 'blockTwo',
    },
    prepare: ({ header, blockOne, blockTwo }) => {
      const blockTypeNames = [blockOne && blockOne[0], blockTwo && blockTwo[0]]
        .filter(Boolean)
        .map((block) => block._type)
        .map(camelCaseToSentence);
      const subtitle =
        [header?.title, ...blockTypeNames].filter(Boolean).join(', ') ||
        '(empty)';
      return {
        title: '2-up Block',
        subtitle,
      };
    },
  },
});
