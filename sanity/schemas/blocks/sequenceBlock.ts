import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';
import { themeOptions } from '../../lib/constants';

export const SequenceBlockTextFields = defineField({
  name: 'sequenceBlockTextFields',
  title: 'Text Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bellyButtonText',
      title: 'Belly button text',
      type: 'string',
      description: 'Small text that appears between the Title and Description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const SequenceItem = defineType({
  name: 'sequenceItem',
  title: 'Sequence Item',
  type: 'object',
  initialValue: {
    theme: 'white',
    flipAlignment: false,
    isHighlighted: false,
  },
  fields: [
    defineField({
      name: 'video',
      title: 'Video',
      type: 'video',
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'sequenceBlockTextFields',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: themeOptions,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'flipAlignment',
      title: 'flipAlignment',
      type: 'boolean',
      description:
        'Toggle on to flip the alignment of the sequence item (default alignment is video on left and text on right).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isHighlighted',
      title: 'Highlight Sequence Item',
      type: 'boolean',
      description:
        'Highlighted items render with additional styles to make it standout amongst the other sequence items.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'copy.title',
      media: 'video.posterImage',
      subtitle: 'copy.description',
    },
    prepare({ title, media, subtitle }) {
      return {
        media,
        title,
        subtitle,
      };
    },
  },
});

export const SequenceBlock = defineType({
  name: 'sequenceBlock',
  title: 'Sequence Block',
  icon: icons.SequenceBlock,
  type: 'object',
  fields: [
    defineField({
      name: 'sequenceHeader',
      title: 'Header',
      type: 'sequenceBlockTextFields',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sequenceItems',
      title: 'Sequence Items',
      type: 'array',
      of: [defineArrayMember({ type: 'sequenceItem' })],
    }),
    defineField({
      name: 'sequenceFooter',
      title: 'Footer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Sequence Block' };
    },
  },
});
