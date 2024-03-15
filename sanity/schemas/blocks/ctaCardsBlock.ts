import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const CtaCard = defineType({
  name: 'ctaCard',
  title: 'CTA Card',
  type: 'object',
  icon: icons.CTA,
  fields: [
    defineField({
      name: 'image',
      type: 'richImage',
      title: 'Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'simpleRichText',
      title: 'Body',
    }),
    defineField({
      name: 'cta',
      type: 'cta',
      title: 'CTA',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      image: 'image',
      title: 'title',
      cta: 'cta',
    },
    prepare: ({ image, title, cta }) => ({
      media: image,
      title: title,
      subtitle: cta ? `CTA (${cta.variant}): ${cta.label}` : undefined,
    }),
  },
});

export const CtaCardsBlock = defineType({
  name: 'ctaCardsBlock',
  title: 'CTA Cards Block',
  type: 'object',
  icon: icons.CTA,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'ctaCards',
      type: 'array',
      of: [{ type: 'ctaCard' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      header: 'header',
      ctaCardTitle: 'ctaCards.0.title',
    },
    prepare: ({ header, ctaCardTitle }) => ({
      title: 'CTA Cards Block',
      subtitle: header?.title || ctaCardTitle,
    }),
  },
});
