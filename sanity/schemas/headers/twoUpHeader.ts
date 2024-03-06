import { defineType, defineField } from 'sanity';

import { icons } from '../../lib/icons';
import { camelCaseToSentence } from '../../lib/utils';

const childContentBlockTypes = [
  { type: 'imageChildBlock' },
  { type: 'headerContentChildBlock' },
  { type: 'headerQrCodeChildBlock' },
];

export const TwoUpHeaderBlock = defineType({
  name: 'twoUpHeader',
  title: '2-up Header',
  type: 'object',
  icon: icons.TwoUp,
  fields: [
    /* This field must match fields within twoUpBlock. 
       This will use TwoUpBlock component. */
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'overlap-50-50',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Normal 50/50', value: 'normal-50-50' },
          { title: 'Overlap 50/50', value: 'overlap-50-50' },
        ],
      },
    }),
    defineField({
      name: 'mobileReverseBlockOrder',
      title: '(Mobile) Reverse block order',
      type: 'boolean',
    }),
    defineField({
      name: 'blockThemes',
      title: 'Block Themes',
      type: 'object',
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
  ],
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
        [header?.title, ...blockTypeNames].join(', ') || '(empty)';
      return {
        title: '2-up Header',
        subtitle,
      };
    },
  },
});
