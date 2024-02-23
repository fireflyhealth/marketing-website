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
      name: 'icon',
      type: 'icon',
      title: 'Icon',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'body',
      title: 'Rich Text',
      type: 'limitedRichText',
      validation: (Rule) => Rule.required(),
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
