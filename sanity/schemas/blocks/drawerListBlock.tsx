import { defineType, defineField } from 'sanity';
import { richTextToString } from '../../lib/richTextToString';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

// DrawerListBlock and CardListBlock share the same fields
// but have render different styles based on sreen size

export const DrawerListBlock = defineType({
  name: 'drawerListBlock',
  title: 'Drawer List Block',
  type: 'object',
  icon: icons.Drawer,
  fields: [
    ...requiredBlockFields,
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
      backgroundImage: 'backgroundImage',
    },
    prepare: ({ title, body, theme, featuredImage, backgroundImage }) => {
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
        media:
          featuredImage ||
          backgroundImage.desktop ||
          backgroundImage.tablet ||
          backgroundImage.mobile,
      };
    },
  },
});
