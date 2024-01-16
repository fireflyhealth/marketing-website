import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const DownloadPage = defineType({
  name: 'downloadPage',
  type: 'document',
  title: 'Download Page',
  icon: icons.Download,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
});

export const ContactPage = defineType({
  name: 'contactPage',
  type: 'document',
  title: 'Contact Page',
  icon: icons.Contact,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
});

export const NotFoundPage = defineType({
  name: 'notFoundPage',
  type: 'document',
  title: '404 Page',
  icon: icons.NotFound,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
});

export const FAQPage = defineType({
  name: 'faqPage',
  type: 'document',
  title: 'FAQs',
  icon: icons.Question,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
});
