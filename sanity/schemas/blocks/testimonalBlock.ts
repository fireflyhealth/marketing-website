import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

export const TestimonialBlock = defineType({
  name: 'testimonialBlock',
  title: 'Testimonal Carousel Block',
  type: 'object',
  icon: icons.Testimonial,
  fields: [
    ...requiredBlockFields,
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [defineArrayMember({ type: 'quoteObject' })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      testimonials: 'testimonials',
    },
    prepare: ({ testimonials }) => {
      return {
        title: 'Testimonial Block',
        subtitle: testimonials
          ? `${testimonials.length} testimonial(s)`
          : undefined,
      };
    },
  },
});
