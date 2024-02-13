import { defineType, defineField } from 'sanity';
import { backgroundColorList } from '../../lib/constants';
import { richTextToString } from '../../lib/richTextToString';

export const DrawerListBlock = defineType({
  name: 'drawerListBlock',
  title: 'Drawer List',
  type: 'object',
  fields: [
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
    }),
    defineField({
      name: 'drawerListItems',
      type: 'array',
      of: [{ type: 'drawerListItem' }],
    }),
  ],
});

export const DrawerListItem = defineType({
  name: 'drawerListItem',
  title: 'Drawer List Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'CTA Link',
      type: 'linkWithLabel',
      name: 'ctaLink',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'richImage',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'simplerColor',
      options: {
        colorList: backgroundColorList,
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // @ts-ignore
          if (!value && !context?.parent?.backgroundImage) {
            return 'Either a Background Color or Background Image is required';
          }
          // @ts-ignore
          if (value && context?.parent?.backgroundImage) {
            return 'Must be empty when a Background image is selected';
          }
          return true;
        }),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'responsiveImageSet',
      description:
        'Note: When providing a background image, make sure it is dark enough for the light yellow text to have contrast',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          // @ts-ignore
          if (!value && !context?.parent?.backgroundColor) {
            return 'Either a Background Color or Background Image is required';
          }
          // @ts-ignore
          if (value && context?.parent?.backgroundColor) {
            return 'Must be empty when a Background image is selected';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      body: 'body',
      featuredImage: 'featuredImage',
    },
    prepare: ({ title, body, featuredImage }) => ({
      title,
      subtitle: body ? richTextToString(body) : undefined,
      media: featuredImage,
    }),
  },
});
