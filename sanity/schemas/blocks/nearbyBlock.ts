import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

const aspectRatio = (breakPoint) =>
  defineField({
    name: `${breakPoint}AspectRatio`,
    title: `${breakPoint.charAt(0).toUpperCase() + breakPoint.slice(1)} Aspect Ratio`,
    description:
      'To define a horizontal aspect ratio, the left figure should be greater than the right.  To define a vertical aspect ratio, the figure on the left should be less than the right.',
    type: 'object',
    fields: [
      {
        name: 'figureOne',
        title: 'Figure',
        type: 'number',
      },
      {
        name: 'figureTwo',
        title: 'Figure',
        type: 'number',
      },
    ],
  });

export const NearbyBlock = defineType({
  name: 'nearbyBlock',
  title: 'Nearby Block',
  icon: icons.Map,
  type: 'object',
  fields: [
    ...requiredBlockFields,
    {
      name: 'mapUrl',
      title: 'Map Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    aspectRatio('mobile'),
    aspectRatio('tablet'),
    aspectRatio('desktop'),
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Firefly Nearby Block',
      };
    },
  },
});
