import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

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
    {
      name: 'mobileAspectRatio',
      title: 'Mobile Aspect Ratio',
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
    },
    {
      name: 'tabletAspectRatio',
      title: 'Tablet Aspect Ratio',
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
    },
    {
      name: 'desktopAspectRatio',
      title: 'Desktop Aspect Ratio',
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
    },
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Firefly Nearby Block',
      };
    },
  },
});
