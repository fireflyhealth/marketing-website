import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { richTextToString } from '../../lib/richTextToString';
import { BrandedIcon } from '../../../www/src/svgs/BrandedIcon';

export const RichTextChildBlock = defineType({
  name: 'richTextChildBlock',
  title: 'Rich Text Block',
  type: 'object',
  icon: icons.Text,
  fields: [
    defineField({
      name: 'alignCenter',
      type: 'boolean',
      title: 'Align Center',
    }),
    defineField({
      name: 'icon',
      type: 'icon',
      title: 'Icon',
    }),
    defineField({
      name: 'image',
      type: 'richImage',
      title: 'Image',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'headingFontSize',
      title: 'Heading Font Size',
      type: 'string',
      initialValue: 'font-size-6',
      validation: (Rule) => Rule.required(),
      description:
        'Select the font size for the heading - Font Size 6 is the smallest, Font Size 4 is the largest.',
      options: {
        list: [
          { title: 'Font size 7', value: 'font-size-7' },
          { title: 'Font Size 6', value: 'font-size-6' },
          { title: 'Font Size 5', value: 'font-size-5' },
          { title: 'Font Size 4', value: 'font-size-4' },
        ],
      },
    }),
    defineField({
      name: 'body',
      title: 'Rich Text',
      type: 'limitedRichText',
    }),
  ],
  preview: {
    select: { heading: 'heading', body: 'body', icon: 'icon' },
    prepare: ({ heading, body, icon }) => {
      const subtitle =
        [heading, body ? richTextToString(body) : undefined]
          .filter(Boolean)
          .join(' | ') || undefined;
      return {
        title: 'Rich Text Block',
        subtitle,
        media: icon?.icon ? <BrandedIcon type={icon.icon} /> : undefined,
      };
    },
  },
});
