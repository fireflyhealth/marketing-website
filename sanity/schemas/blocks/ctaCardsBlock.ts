import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const CtaCard = defineType({
  name: 'ctaCard',
  title: 'CTA Card',
  type: 'object',
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
      subtitle: `CTA (${cta.variant}): ${cta.label}`,
      title: title,
    }),
  },
});

export const CtaCardsBlock = defineType({
  name: 'ctaCardsBlock',
  title: 'CTA Cards Block',
  type: 'object',
  icon: icons.CTA,
  fields: [
    defineField({
      name: 'header',
      type: 'contentBlockHeader',
      title: 'Header',
    }),
    defineField({
      name: 'ctaCards',
      type: 'array',
      of: [{ type: 'ctaCard' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
