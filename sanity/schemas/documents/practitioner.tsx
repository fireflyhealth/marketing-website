import { defineArrayMember, defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { createDocumentVariantField } from '../../plugins/documentVariants/fields/documentVariant';
import { cloneWithUniqueSlug } from '../../plugins/documentVariants/utils';

export const Practitioner = defineType({
  name: 'practitioner',
  type: 'document',
  title: 'Practitioner',
  icon: icons.Practitioner,
  fields: [
    createDocumentVariantField({
      cloneOptions: {
        getCloneData: cloneWithUniqueSlug,
      },
    }),
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
    defineField({
      name: 'renderProviderPage',
      title: 'Render Provider Page',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contentArea',
      title: 'Content Area',
      type: 'contentArea',
      hidden: ({ parent }) => !parent.renderProviderPage,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      title: 'title',
      qualifications: 'qualifications',
      headshot: 'headshot',
      documentVariantInfo: 'documentVariantInfo',
    },
    prepare: ({
      documentVariantInfo,
      name,
      title,
      qualifications,
      headshot,
    }) => {
      const fullTitle = [documentVariantInfo?.variantOf ? '🅱️' : null, name]
        .filter(Boolean)
        .join(' ');

      return {
        title: fullTitle,
        subtitle: [title, qualifications].filter(Boolean).join(' | '),
        media: headshot,
      };
    },
  },
});
