import { defineField, defineType } from 'sanity';
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
      name: 'logoColor',
      type: 'image',
      description: 'Logo in color',
      group: 'globalNavigation',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoMonochrome',
      type: 'image',
      description: 'Logo in monochrome',
      group: 'globalNavigation',
      options: {
        hotspot: true,
      },
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
