import { defineType, defineField } from 'sanity';

export const QrCode = defineType({
  name: 'qrCodeObject',
  title: 'QR Code',
  type: 'object',
  fields: [
    defineField({
      name: 'qrCodeImage',
      title: 'OR Code Image',
      type: 'richImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Helper Text',
      type: 'string',
    }),
    defineField({
      title: 'Store Links',
      name: 'storeLinks',
      type: 'object',
      fields: [
        defineField({
          name: 'appStoreLink',
          title: 'App Store Link',
          type: 'link',
        }),
        defineField({
          name: 'playStoreLink',
          title: 'Play Store Link',
          type: 'link',
        }),
      ],
    }),
  ],
});
