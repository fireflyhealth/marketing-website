import { defineField, defineType } from 'sanity';

export const NavigationOverrides = defineType({
  name: 'navigationOverrides',
  title: 'Navigation Overrides',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'pageNavigation',
      type: 'reference',
      to: [{ type: 'navigation' }],
      description:
        'This optional field overrides the global nav set in Site Settings.',
    }),
    defineField({
      name: 'announcementBanner',
      type: 'announcementBanner',
      description:
        'This optional field overrides the global announcement banner set in Site Settings.',
    }),
  ],
});
