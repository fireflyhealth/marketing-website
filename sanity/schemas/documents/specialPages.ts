import { defineField, defineType } from 'sanity';
import { icons } from '../../lib/icons';
import { createDocumentVariantField } from '../../plugins/documentVariants/fields/documentVariant';

export const DownloadPage = defineType({
  name: 'downloadPage',
  type: 'document',
  title: 'Download Page',
  icon: icons.Download,
  fields: [
    createDocumentVariantField(),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigationOverrides',
      type: 'navigationOverrides',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'headerArea',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'contentArea',
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      documentVariantInfo: 'documentVariantInfo',
    },
    prepare: ({ title, documentVariantInfo }) => {
      const fullTitle = [documentVariantInfo?.variantOf ? '🅱️' : null, title]
        .filter(Boolean)
        .join(' ');

      return { title: fullTitle };
    },
  },
});

export const ContactPage = defineType({
  name: 'contactPage',
  type: 'document',
  title: 'Contact Page',
  icon: icons.Contact,
  fields: [
    createDocumentVariantField(),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigationOverrides',
      type: 'navigationOverrides',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageDescription',
      title: 'Page Description',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactForm',
      title: 'Contact Form',
      type: 'hubspotForm',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'richImage',
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      documentVariantInfo: 'documentVariantInfo',
    },
    prepare: ({ title, documentVariantInfo }) => {
      const fullTitle = [documentVariantInfo?.variantOf ? '🅱️' : null, title]
        .filter(Boolean)
        .join(' ');

      return { title: fullTitle };
    },
  },
});

export const NotFoundPage = defineType({
  name: 'notFoundPage',
  type: 'document',
  title: '404 Page',
  icon: icons.NotFound,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'navigationOverrides',
      type: 'navigationOverrides',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'headerArea',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'contentArea',
    }),
    defineField({
      name: 'decorativeImage',
      title: 'Decorative Image',
      type: 'responsiveImageSet',
      options: {
        collapsed: true,
        collapsible: true,
      },
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      title: 'Metadata',
    }),
  ],
});

// This is not an index page, rather settings to control components that should render on all provider pages
export const ProviderPageSettings = defineType({
  name: 'providerPageSettings',
  type: 'document',
  title: 'Provider Page Settings',
  icon: icons.Settings,
  fields: [
    defineField({
      name: 'allProvidersBackLink',
      title: '`All Providers` back link',
      description:
        'Select the page used for the `back` button on the Provider pages.',
      type: 'reference',
      to: [{ type: 'genericPage' }, { type: 'subPage' }],
      options: {
        filter: '!defined(documentVariantInfo.variantOf)',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pcpBlurb',
      title: 'Primary Care Provider (PCP) Blurb',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stories',
      title: 'Stories from Firefly members',
      type: 'testimonialBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'doubleCtaBlock',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
