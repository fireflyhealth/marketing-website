import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

/**
 * Displayed only when developing locally. A place for us to generate
 * mock data to use in tests & stories.
 */
export const MockData = defineType({
  name: 'mockData',
  type: 'document',
  title: 'MockData',
  icon: icons.Code,
  fields: [
    defineField({
      name: 'simpleRichText',
      type: 'simpleRichText',
      title: 'Simple Rich Text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'articleRichText',
      type: 'articleRichText',
      title: 'Article Rich Text',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
