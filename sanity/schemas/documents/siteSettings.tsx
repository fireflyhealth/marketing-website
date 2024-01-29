import { defineArrayMember, defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const SiteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings & Navigation',
  icon: icons.Settings,
  groups: [
    {
      name: 'globalNavigation',
      title: 'Global Navigation',
      icon: icons.Navigation,
    },
    {
      name: 'metadata',
      title: 'Metadata',
      icon: icons.Metadata,
    },
  ],
  fields: [
    defineField({
      name: 'globalNav',
      type: 'reference',
      to: [{ type: 'navigation' }],
      group: 'globalNavigation',
    }),
    defineField({
      name: 'globalAnnouncementBanner',
      type: 'announcementBanner',
      group: 'globalNavigation',
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'mobileCta',
          title: 'CTA (Mobile)',
          type: 'cta',
          options: {
            collapsed: true,
            collapsible: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'footerNavGroups',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'footerNavGroup',
              type: 'object',
              fields: [
                defineField({
                  name: 'navItems',
                  type: 'array',
                  of: [{ type: 'linkWithLabel' }],
                }),
              ],
              preview: {
                select: {
                  navItems: 'navItems',
                },

                prepare: ({ navItems }) => {
                  return {
                    title: navItems.map((item) => item.label).join(', '),
                  };
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'bottomLinks',
          type: 'object',
          title: 'Bottom Links',
          fields: [
            defineField({
              name: 'leftLinks',
              title: 'Left',
              type: 'array',
              of: [{ type: 'linkWithLabel' }],
            }),
            defineField({
              name: 'rightLinks',
              title: 'Right',
              type: 'array',
              of: [{ type: 'linkWithLabel' }],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'defaultMetadata',
      type: 'metadata',
      title: 'Default Metadata',
      group: 'metadata',
      description:
        'Default SEO & Share card info. Used as a fallback for pages that do not have this defined.',
    }),
  ],
});
