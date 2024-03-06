import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';

export const HeaderQrCodeChildBlock = defineType({
  name: 'headerQrCodeChildBlock',
  title: 'Header QR Code Block',
  type: 'object',
  icon: icons.Quote,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
    }),
    defineField({
      name: 'qrCode',
      title: 'QR Code',
      type: 'qrCodeObject',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      header: 'header',
      body: 'body',
    },
    prepare: ({ header, body }) => {
      return {
        title: header,
        subtitle: body,
      };
    },
  },
});
