import { defineType, defineField } from 'sanity';

export const AnnouncementBanner = defineType({
  name: 'announcementBanner',
  title: 'Announcement Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Announcement Text',
      type: 'simpleRichText',
    }),
  ],
});
