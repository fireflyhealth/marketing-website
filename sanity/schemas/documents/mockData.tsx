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
  groups: [
    { title: 'Navigation', name: 'navigation' },
    { title: 'Rich Text', name: 'richText' },
    { title: 'Content Blocks', name: 'contentBlocks' },
    { title: 'Media', name: 'media' },
  ],
  fields: [
    defineField({
      group: 'navigation',
      name: 'navigationExample',
      type: 'object',
      fields: [
        defineField({
          title: 'Global Nav',
          name: 'globalNav',
          type: 'reference',
          to: [{ type: 'navigation' }],
        }),
        defineField({
          name: 'doubleCta',
          type: 'doubleCta',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: 'richText',
      name: 'simpleRichText',
      type: 'simpleRichText',
      title: 'Simple Rich Text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: 'richText',
      name: 'articleRichText',
      type: 'articleRichText',
      title: 'Article Rich Text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: 'contentBlocks',
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
          name: 'doubleCtaBlockExample',
          title: 'Double Cta Block Example',
          type: 'doubleCtaBlock',
          options: {
            collapsible: true,
            collapsed: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'practitionersBlock',
          type: 'practitionersBlock',
          title: 'Practitioners Block',
          options: {
            collapsible: true,
            collapsed: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'imageTextOverlapBlock',
          type: 'imageTextOverlapBlock',
          options: {
            collapsible: true,
            collapsed: true,
          },
          title: 'Image Text Overlap Block',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'quoteBlockExample',
          type: 'quoteBlock',
          title: 'Quote Block',
          options: {
            collapsible: true,
            collapsed: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'drawerListBlock',
          type: 'drawerListBlock',
          title: 'Drawer List Block',
          validation: (Rule) => Rule.required(),
          options: {
            collapsible: true,
            collapsed: true,
          },
        }),
        defineField({
          name: 'twoUpBlocks',
          title: '2-up Blocks',
          type: 'array',
          of: [{ type: 'twoUpBlock' }],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'sequenceBlock',
          type: 'sequenceBlock',
          title: 'Sequence Block',
          validation: (Rule) => Rule.required(),
          options: {
            collapsible: true,
            collapsed: true,
          },
        }),
        defineField({
          name: 'faqBlock',
          title: 'FAQ Block',
          type: 'faqBlock',
          validation: (Rule) => Rule.required(),
          options: {
            collapsible: true,
            collapsed: true,
          },
        }),
        defineField({
          name: 'reviewBlock',
          title: 'Review Block',
          type: 'reviewBlock',
          options: {
            collapsible: true,
            collapsed: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'imageGridBlockExample',
          type: 'imageGridBlock',
          title: 'Image Grid Block Example',
          options: {
            collapsible: true,
            collapsed: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'cardListBlockExample',
          type: 'cardListBlock',
          title: 'Card List Block Example',
          options: {
            collapsible: true,
            collapsed: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'featuredStoriesBlock',
          type: 'featuredStoriesBlock',
          title: 'Featured Stories Block',
          options: {
            collapsible: true,
            collapsed: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'columnsBlocks',
          title: 'Columns Blocks',
          type: 'array',
          of: [
            {
              type: 'columnsBlock',
            },
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'tabsBlock',
          type: 'tabsBlock',
          title: 'Tabs Block',
          options: {
            collapsible: true,
            collapsed: true,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: 'Rich Text Blocks',
          name: 'richTextBlocks',
          type: 'array',
          of: [{ type: 'richTextBlock' }],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: 'Testimonial Block',
          name: 'testimonialBlock',
          type: 'testimonialBlock',
          options: {
            collapsible: true,
            collapsed: true,
          },
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      group: 'media',
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
      group: 'media',
      name: 'responsiveImageSet',
      type: 'responsiveImageSet',
      title: 'Responsive Image Set',
      options: {
        collapsed: true,
        collapsible: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: 'media',
      name: 'videoExample',
      title: 'Video Example',
      type: 'video',
    }),
    defineField({
      group: 'navigation',
      name: 'links',
      title: 'Link Examples',
      type: 'array',
      of: [{ type: 'linkWithLabel' }],
    }),
    defineField({
      group: 'navigation',
      name: 'ctas',
      title: 'CTA Examples',
      type: 'array',
      of: [{ type: 'cta' }],
    }),
  ],
});
