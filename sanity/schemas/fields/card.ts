import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const Card = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: icons.Cards,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'object',
      description:
        'Adding an image is optional.  If the card does not contain an image, it will render with a default background color - Midnight (navy).',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'richImage',
        }),
        defineField({
          name: 'isBackgroundImage',
          title: 'Background Image',
          type: 'boolean',
          description: 'Toggle to display as background image.',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Cta',
      type: 'cta',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
