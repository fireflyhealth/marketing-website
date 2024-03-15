import { defineType, defineField, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';
import { requiredBlockFields } from './utils/requiredBlockFields';

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
      of: [defineArrayMember({ type: 'quoteObject' })],
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
