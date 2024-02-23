import { defineType, defineField, defineArrayMember } from 'sanity';

import { icons } from '../../lib/icons';

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
      of: [defineArrayMember({ type: 'twoUpObject' })],
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
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'tabs',
      type: 'array',
      of: [defineArrayMember({ type: 'tabsBlockTab' })],
    }),
  ],
});
