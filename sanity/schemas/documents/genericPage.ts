import { defineField, defineType, defineArrayMember } from 'sanity';
import { icons } from '../../lib/icons';
import { API_VERSION, SingletonPageSlugs } from '../../lib/constants';
import { readOnlyIfNotBaseLang } from '../../lib/readOnlyIfNotBaseLang';
import localizationSlugField from '../../lib/localizationSlugField';
import { isUniqueAcrossDocuments } from '../../lib/isUniqueAcrossDocuments';
import { createDocumentVariantField } from '../../plugins/documentVariants/fields/documentVariant';
import {
  cloneWithUniqueSlug,
  isVariantDocument,
} from '../../plugins/documentVariants/utils';

const sharedPageFields = [
  createDocumentVariantField({
    cloneOptions: {
      getCloneData: cloneWithUniqueSlug,
    },
  }),
  defineField({
    name: 'title',
    type: 'string',
    title: 'Title',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'slug',
    type: 'slug',
    title: 'Slug',
    readOnly: readOnlyIfNotBaseLang,
    components: {
      field: localizationSlugField,
    },
    validation: (Rule) =>
      Rule.custom(async (value, { getClient, document }) => {
        const currentSlug = value?.current;
        if (!currentSlug) {
          return 'Required';
        }

        const client = getClient({ apiVersion: API_VERSION });
        if (!document) {
          /* Keep TS happy */
          throw new Error('There was no document provided by the context');
        }
        if (document._type === 'genericPage') {
          /* Validate pages are unique amongst special pages */
          if (Object.values(SingletonPageSlugs).includes(currentSlug)) {
            return 'This slug is already in use';
          }
          /* Validate pages are unique amongst other generic pages & hard-coded pages */
          const otherPages = await client.fetch(
            `*[
              _type == "genericPage"
              && _id != $documentId
              && !(_id in path("drafts.**"))
            ]{ slug, language }`,
            { documentId: document._id.replace('drafts.', '') },
          );
          const otherPageSlugs = otherPages.map((page) => page.slug.current);
          const otherPageLanguages = otherPages.map((language) => language);
          if (otherPageSlugs.includes(currentSlug)) {
            /* Translated pages with the same slug should not return a false validation */
            if (document.language) {
              const currentLanguage = document.language;
              if (otherPageLanguages.includes(currentLanguage)) {
                return `This page has already been translated into ${currentLanguage}.  Try translating the page in a different language.`;
              } else return true;
            }
            return 'This slug is already in use';
          }
          return true;
        } else {
          /* Validate sub-pages are unique amongst siblings */
          const parentPage = await client.fetch(
            `*[_type == "genericPage" && $subPageId in subPages[]._ref]{
              title,
              subPages[]->{ _id, title, slug }
            }[0]`,
            { subPageId: document._id },
          );

          if (!parentPage) return true;
          const siblingSlugs = parentPage.subPages
            .filter((subPage) => subPage._id !== document._id)
            .map((subPage) => subPage.slug.current);

          if (siblingSlugs.includes(currentSlug)) {
            return `The page "${parentPage.title}" already has a sub-page with this slug`;
          }
          return true;
        }
      }),
    options: {
      source: 'title',
      isUnique: isUniqueAcrossDocuments,
    },
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
    name: 'subnav',
    title: 'Render Subnav',
    type: 'boolean',
  }),
  defineField({
    name: 'content',
    title: 'Content',
    type: 'contentArea',
  }),
  defineField({
    name: 'metadata',
    title: 'Metadata',
    type: 'metadata',
  }),
] as const;

export const SubPage = defineType({
  name: 'subPage',
  title: 'SubPage',
  type: 'document',
  icon: icons.Page,
  groups: [
    {
      name: 'subPages',
      title: 'SubPages',
      icon: icons.Page,
    },
  ],
  fields: [...sharedPageFields],
  preview: {
    select: { title: 'title', documentVariantInfo: 'documentVariantInfo' },
    prepare: ({ documentVariantInfo, title }) => {
      const fullTitle = [documentVariantInfo?.variantOf ? '🅱️' : null, title]
        .filter(Boolean)
        .join(' ');

      return { title: fullTitle };
    },
  },
});

export const GenericPage = defineType({
  name: 'genericPage',
  title: 'Page',
  type: 'document',
  icon: icons.Page,
  groups: [
    {
      name: 'subPages',
      title: 'SubPages',
      icon: icons.Page,
    },
  ],
  fields: [
    ...sharedPageFields,
    defineField({
      name: 'subPages',
      title: 'Sub Pages',
      type: 'array',
      group: 'subPages',
      readOnly: ({ document }) => isVariantDocument(document),
      of: [
        defineArrayMember({
          type: 'reference',
          options: {
            filter: '!defined(documentVariantInfo.variantOf)',
          },
          to: [{ type: SubPage.name }],
          validation: (Rule) =>
            Rule.custom(async (value, context) => {
              if (!value) return true;

              const client = context.getClient({ apiVersion: API_VERSION });
              /* Ensure that this page is not a subPage of a different parent */
              const subPage = await client.fetch(
                `*[_id == $subPageId]{
                "parentPages": *[
                  _type == "genericPage"
                  && ^._id in subPages[]._ref
                ]{ _id }
              }`,
                { subPageId: value._ref },
              );
              if (
                subPage.parentPages &&
                subPage.parentPages.filter(
                  // @ts-ignore
                  (parent) =>
                    // @ts-ignore
                    parent._id !== context.document._id.replace('drafts.', ''),
                )
              ) {
                return 'This page is already referenced by another parent page';
              }
              return true;
            }),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', documentVariantInfo: 'documentVariantInfo' },
    prepare: ({ documentVariantInfo, title }) => {
      const fullTitle = [documentVariantInfo?.variantOf ? '🅱️' : '🅰️', title]
        .filter(Boolean)
        .join(' ');

      return {
        title: documentVariantInfo ? fullTitle : title,
        subtitle: documentVariantInfo ? '🅰️/🅱️' : undefined,
      };
    },
  },
});
