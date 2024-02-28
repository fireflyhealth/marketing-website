import { defineType } from 'sanity';
import { snakeCaseToSentence } from '../../lib/utils';
import { iconTypes, BrandedIcon } from '../../../www/src/svgs/BrandedIcon';

export const brandedIcons = iconTypes
  .map((iconType) => ({
    title: snakeCaseToSentence(iconType),
    value: iconType,
  }))
  .sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));

export const Icon = defineType({
  name: 'icon',
  type: 'object',
  title: 'Icon',
  fields: [
    {
      name: 'icon',
      type: 'string',
      title: 'Icon',
      options: {
        list: brandedIcons,
      },
    },
  ],
  preview: {
    select: {
      title: 'icon',
    },
    prepare: ({ title }) => {
      return {
        title: snakeCaseToSentence(title),
        media: <BrandedIcon type={title} />,
      };
    },
  },
});
