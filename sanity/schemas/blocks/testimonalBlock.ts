import { defineType, defineField, defineArrayMember } from 'sanity';
import { richTextToString } from '../../lib/richTextToString';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const TestimonalItem = defineType({
  name: 'testimonialItem',
  title: 'Testimonial Item',
  icon: icons.Testimonial,
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'richImage',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonal',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichText',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'testimonial',
      subtitle: 'name',
    },
    prepare: ({ media, title, subtitle }) => {
      return {
        media,
        title: richTextToString(title),
        subtitle,
      };
    },
  },
});

export const TestimonialBlock = defineType({
  name: 'testimonialBlock',
  title: 'Testimonal Block',
  type: 'object',
  icon: icons.Testimonial,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [defineArrayMember({ type: 'testimonialItem' })],
    }),
  ],
  preview: {
    select: {
      testimonials: 'testimonials',
    },
    prepare: ({ testimonials }) => {
      return {
        title: 'Testimonial Block',
        subtitle: `${testimonials.length} testimonial(s)`,
      };
    },
  },
});
