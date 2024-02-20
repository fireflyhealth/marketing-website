import { defineType, defineField } from 'sanity';
import { icons } from '../../lib/icons';

export const CTA = defineType({
  name: 'cta',
  type: 'object',
  title: 'CTA',
  icon: icons.CTA,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ariaLabel',
      type: 'string',
      title: 'Aria Label',
      description:
        'Optional. Provide an Aria Label when the button\'s text label does not convey its function adequately or if the label is too generic. For example: a button with the label "OK" should be given an Aria Label such as "Accept terms & conditions"',
    }),
    defineField({
      name: 'id',
      type: 'string',
      title: 'ID',
      description: 'Used for tracking in analytics',
      validation: (Rule) =>
        Rule.custom((value?: string) => {
          if (!value) return 'Required';
          if (value.toLowerCase() !== value) {
            return 'Must be all lowercase';
          }
          if (!/^([A-Za-z0-9-_])+$/.test(value)) {
            return 'Can only be letters, numbers, hyphens, and underscores (no spaces or special characters)';
          }
          return true;
        }),
    }),
    defineField({
      name: 'variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outlined', value: 'outlined' },
        ],
      },
      initialValue: 'primary',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const NotRequiredCTA = defineType({
  name: 'notRequiredCta',
  type: 'object',
  title: 'CTA',
  icon: icons.CTA,
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (!fields?.label) {
        return true;
      }

      const id = fields?.id as string | undefined;
      if (!id) return 'ID field is required';
      if (id.toLowerCase() !== id) {
        return 'Id field must be all lowercase';
      }
      if (!/^([A-Za-z0-9-_])+$/.test(id)) {
        return 'Id field can only be letters, numbers, hyphens, and underscores (no spaces or special characters)';
      }

      const variant = fields?.variant as string | undefined;
      if (!variant) return 'Variant field is required';

      const link = fields?.link as Object | undefined;
      if (!link) return 'Link field is required';

      return true;
    }),
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
    }),
    defineField({
      name: 'ariaLabel',
      type: 'string',
      title: 'Aria Label',
      description:
        'Optional. Provide an Aria Label when the button\'s text label does not convey its function adequately or if the label is too generic. For example: a button with the label "OK" should be given an Aria Label such as "Accept terms & conditions"',
    }),
    defineField({
      name: 'id',
      type: 'string',
      title: 'ID',
      description: 'Used for tracking in analytics',
    }),
    defineField({
      name: 'variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outlined', value: 'outlined' },
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'link',
      type: 'link',
      title: 'Link',
    }),
  ],
});
