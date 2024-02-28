import { defineType, defineField, defineArrayMember } from 'sanity';

import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const TabsBlockTab = defineType({
  name: 'tabsBlockTab',
  title: 'Tab',
  type: 'object',
  icon: icons.Tabs,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({ type: 'twoUpObject' }),
        defineArrayMember({ type: 'columnsObject' }),
      ],
      validation: (Rule) => Rule.required().max(1),
    }),
  ],
});

export const TabsBlock = defineType({
  name: 'tabsBlock',
  title: 'Tabs Block',
  type: 'object',
  icon: icons.Tabs,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'tabs',
      type: 'array',
      of: [defineArrayMember({ type: 'tabsBlockTab' })],
    }),
  ],
  preview: {
    select: {
      header: 'header',
      tabs: 'tabs',
    },
    prepare: ({ header, tabs }) => {
      const subtitle = header?.title
        ? header.title
        : tabs?.length
          ? tabs
              .map((tab) => tab.label)
              .filter(Boolean)
              .join(', ')
          : undefined;
      return {
        title: 'Tabs Block',
        subtitle,
      };
    },
  },
});
