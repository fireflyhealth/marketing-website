import { defineType, defineField } from 'sanity';

import { icons } from '../../lib/icons';
import { camelCaseToSentence } from '../../lib/utils';
import { getSharedFields } from '../blocks/twoUpBlock';

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
  fields: [...getSharedFields(true, childContentBlockTypes)],
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
