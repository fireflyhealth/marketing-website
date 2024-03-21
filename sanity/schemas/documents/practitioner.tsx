import { defineArrayMember, defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { createDocumentVariantField } from '../../plugins/documentVariants/fields/documentVariant';

export const Practitioner = defineType({
  name: 'practitioner',
  type: 'document',
  title: 'Practitioner',
  icon: icons.Practitioner,
  fields: [
    createDocumentVariantField(),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'i.e. "Primary Care Provider (PCP)"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications',
      type: 'string',
      description: 'i.e. "MD, MSc"',
    }),
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'richImage',
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'institution',
          title: 'Institution',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Insitution Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              name: 'name',
            },
            prepare: ({ name }) => ({ title: name }),
          },
        }),
      ],
    }),
    defineField({
      name: 'languagesSpoken',
      title: 'Languages Spoken',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      title: 'title',
      qualifications: 'qualifications',
      headshot: 'headshot',
    },
    prepare: ({ name, title, qualifications, headshot }) => {
      return {
        title: name,
        subtitle: [title, qualifications].filter(Boolean).join(' | '),
        media: headshot,
      };
    },
  },
});
