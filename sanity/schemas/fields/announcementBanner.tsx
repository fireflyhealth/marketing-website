import { defineType, defineField } from 'sanity';

export const AnnouncementBanner = defineType({
  name: 'announcementBanner',
  title: 'Announcement Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Announcement Text',
      type: 'simpleRichText',
    }),
  ],
});
