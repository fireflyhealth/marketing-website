import { Rule, defineType, defineField } from 'sanity';
import { validateOnlyOne } from './linking';

export const QrCode = defineType({
  name: 'qrCodeObject',
  title: 'QR Code',
  type: 'object',
  fields: [
    defineField({
      name: 'qrCodeImage',
      title: 'OR Code Image',
      type: 'richImage',
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
          name: 'appStoreimage',
          title: 'App Store Image',
          type: 'richImage',
        }),
        defineField({
          name: 'appStoreLink',
          title: 'App Store Link',
          type: 'url',
          validation: (Rule) => {
            return validateOnlyOne(Rule as Rule).uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            });
          },
        }),
        defineField({
          name: 'playStoreimage',
          title: 'Play store Image',
          type: 'richImage',
        }),
        defineField({
          name: 'playStoreLink',
          title: 'Play Store Link',
          type: 'url',
          validation: (Rule) => {
            return validateOnlyOne(Rule as Rule).uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            });
          },
        }),
      ],
    }),
  ],
});
