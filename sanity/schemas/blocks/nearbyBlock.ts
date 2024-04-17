import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

const aspectRatio = (breakPoint) =>
  defineField({
    name: `${breakPoint}AspectRatio`,
    title: `${breakPoint.charAt(0).toUpperCase() + breakPoint.slice(1)} Aspect Ratio`,
    description:
      'To define a horizontal aspect ratio, `Figure One` should be greater than `Figure Two`.  To define a vertical aspect ratio, `Figure Two` should be greater than `Figure One`.',
    type: 'object',
    fields: [
      {
        name: 'figureOne',
        title: 'Figure One',
        type: 'number',
        validation: (Rule) =>
          Rule.custom((value, context) => {
            // @ts-ignore
            if (context?.parent?.figureTwo >= 0 && !value) {
              return 'Both fields must contain a number to properly set the aspect ratio.';
            }

            return true;
          }),
      },
      {
        name: 'figureTwo',
        title: 'Figure Two',
        type: 'number',
        validation: (Rule) =>
          Rule.custom((value, context) => {
            // @ts-ignore
            if (context?.parent?.figureOne >= 0 && !value) {
              return 'Both fields must contain a number to properly set the aspect ratio.';
            }

            return true;
          }),
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
