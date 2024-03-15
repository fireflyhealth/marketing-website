import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

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
