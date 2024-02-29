import { defineType, defineField, defineArrayMember } from 'sanity';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const TestimonalItem = defineType({
  name: 'testimonialItem',
  title: 'Testimonial Item',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'richImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonal',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attestant',
      title: 'Attestant',
      type: 'object',
      fields: [
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
    }),
  ],
});

export const TestimonialBlock = defineType({
  name: 'testimonialBlock',
  title: 'Testimonal Block',
  type: 'object',
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [defineArrayMember({ type: 'testimonialItem' })],
    }),
  ],
});
