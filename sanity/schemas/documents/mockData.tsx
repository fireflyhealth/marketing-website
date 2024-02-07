import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';

/**
 * Displayed only when developing locally. A place for us to generate
 * mock data to use in tests & stories.
 */
export const MockData = defineType({
  name: 'mockData',
  type: 'document',
  title: 'MockData',
  icon: icons.Code,
  fields: [
    defineField({
      name: 'navigation',
      type: 'reference',
      to: [{ type: 'navigation' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'simpleRichText',
      type: 'simpleRichText',
      title: 'Simple Rich Text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'articleRichText',
      type: 'articleRichText',
      title: 'Article Rich Text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentBlockExamples',
      title: 'Content Blocks',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'imageBlock',
          type: 'imageBlock',
          options: {
            collapsible: true,
            collapsed: true,
          },
          title: 'Image Block',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'imageCarouselBlock',
          type: 'imageCarouselBlock',
          options: {
            collapsible: true,
            collapsed: true,
          },
          title: 'Image Carousel Block',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'videoHeaderExample',
          title: 'Video Header Example',
          type: 'videoHeader',
          options: {
            collapsible: true,
            collapsed: true,
          },
        }),
        defineField({
          name: 'ctaCardsBlock',
          type: 'ctaCardsBlock',
          title: 'CTA Cards Block',
          options: {
            collapsible: true,
            collapsed: true,
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      title: 'Image Examples',
      name: 'imageExamples',
      type: 'array',

      of: [
        defineArrayMember({
          title: 'Image Example',
          name: 'imageExample',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'richImage',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { label: 'label', image: 'image' },
            prepare: ({ label, image }) => ({ title: label, media: image }),
          },
        }),
      ],
    }),
    defineField({
      name: 'videoExample',
      title: 'Video Example',
      type: 'video',
    }),
    defineField({
      name: 'links',
      title: 'Link Examples',
      type: 'array',
      of: [{ type: 'linkWithLabel' }],
    }),
    defineField({
      name: 'ctas',
      title: 'CTA Examples',
      type: 'array',
      of: [{ type: 'cta' }],
    }),
    defineField({
      name: 'doubleCtaBlockExample',
      title: 'Double Cta Block Example',
      type: 'doubleCtaBlock',
    }),
  ],
});
