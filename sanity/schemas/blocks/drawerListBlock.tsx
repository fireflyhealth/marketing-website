import { defineType, defineField } from 'sanity';
import { richTextToString } from '../../lib/richTextToString';
import { icons } from '../../lib/icons';

export const DrawerListBlock = defineType({
  name: 'drawerListBlock',
  title: 'Drawer List Block',
  type: 'object',
  icon: icons.Drawer,
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
  preview: {
    select: {
      header: 'header',
    },
    prepare: ({ header }) => ({
      title: 'Drawer List Block',
      subtitle: header.title,
    }),
  },
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
      name: 'theme',
      type: 'theme',
      title: 'Theme',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'responsiveImageSet',
      description:
        'Note: When providing a background image, pick an appropriate theme that will make the text have contrast against the image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      body: 'body',
      theme: 'theme',
      featuredImage: 'featuredImage',
    },
    prepare: ({ title, body, theme, featuredImage }) => {
      const subtitle =
        [
          theme ? `(${theme})` : undefined,
          body ? richTextToString(body) : undefined,
        ]
          .filter(Boolean)
          .join(' ') || undefined;
      return {
        title,
        subtitle,
        media: featuredImage,
      };
    },
  },
});
