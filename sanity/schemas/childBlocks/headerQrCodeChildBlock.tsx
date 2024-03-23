import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { richTextToString } from '../../lib/richTextToString';

export const HeaderQrCodeChildBlock = defineType({
  name: 'headerQrCodeChildBlock',
  title: 'Header QR Code Block',
  type: 'object',
  icon: icons.QrCode,
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
      heading: 'heading',
      body: 'body',
    },
    prepare: ({ heading, body }) => {
      return {
        title: heading,
        subtitle: body ? richTextToString(body) : undefined,
      };
    },
  },
});
