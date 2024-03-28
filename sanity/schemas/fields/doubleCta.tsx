import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';
import idValidationRule from '../util/idValidationRule';

export const LargeCTACard = defineField({
  name: 'largeCtaCard',
  title: 'Large CTA Card',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
    defineField({
      name: 'id',
      type: 'string',
      title: 'ID',
      description: 'Used for tracking in analytics',
      validation: idValidationRule,
    }),
    defineField({
      name: 'ariaLabel',
      type: 'string',
      title: 'Aria Label',
      description:
        'Optional. Provide an Aria Label when the button\'s text label does not convey its function adequately or if the label is too generic. For example: a button with the label "OK" should be given an Aria Label such as "Accept terms & conditions"',
    }),
  ],
});

export const DoubleCta = defineType({
  name: 'doubleCta',
  title: '2-up Big CTA',
  type: 'object',
  icon: icons.DoubleCTA,
  fields: [
    defineField({
      name: 'ctaOne',
      title: 'CTA One',
      type: 'largeCtaCard',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      name: 'ctaTwo',
      title: 'CTA Two',
      type: 'largeCtaCard',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Double CTA Block' }),
  },
});
