import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { hasAncestorOfType } from '../../lib/utils';

export const Quote = defineType({
  name: 'quoteObject',
  title: 'Quote',
  type: 'object',
  icon: icons.Quote,
  fields: [
    defineField({
      name: 'badgeImage',
      title: 'Badge/Logo Image',
      description: 'Appears in Review Blocks and Rich Text blocks',
      type: 'richImage',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const isWithinReviewBlock = hasAncestorOfType(context, 'reviewBlock');
          if (!value && isWithinReviewBlock) {
            return 'Required in Review Blocks';
          }
          return true;
        }),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'icon',
      description: 'Appears in Rich Text and 2-up blocks',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Appears in Rich Text and 2-up blocks',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          description:
            'i.e. "Jane, 42" or "Blue Cross Blue Shield Massachussetts"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'labelSubtitle',
          title: 'Label (Line 2)',
          type: 'string',
          description: 'i.e. "Firefly member since 2018"',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'richImage',
          description:
            'Appears only in Testimonial Carousel blocks and Review Blocks',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      quote: 'quote',
      attribution: 'attribution',
      badgeImage: 'badgeImage',
      icon: 'icon',
    },
    prepare: ({ quote, attribution, badgeImage }) => {
      const image = badgeImage || attribution.image;
      const subtitle = attribution
        ? [attribution.label, attribution.labelSubtitle]
            .filter(Boolean)
            .join(' - ')
        : undefined;
      return {
        title: quote ? quote : '(empty)',
        subtitle,
        icon: icons.Quote,
        media: image,
      };
    },
  },
});
