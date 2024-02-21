import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';

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
      name: 'isHighlighted',
      title: 'Highlight Sequence Item',
      type: 'boolean',
      description:
        'Highlighted items render with additional styles to make it standout amongst the other sequence items.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'theme',
      hidden: ({ parent }) => parent.isHighlighted === false,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // @ts-ignore
          if (context?.parent?.isHighlighted === true && !value) {
            return 'Theme is required for highlighted sequence items.';
          }

          return true;
        }),
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
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
    }),
    defineField({
      name: 'sequenceHeader',
      title: 'Sequence Heading',
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
      title: 'Sequence Footer',
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
