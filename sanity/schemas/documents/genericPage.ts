import {
  defineField,
  defineType,
  defineArrayMember,
} from '@sanity-typed/types';
import { icons } from '../../lib/icons';
import { API_VERSION, SingletonPageSlugs } from '../../lib/constants';

const sharedPageFields = [
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
    options: {
      source: 'title',
      isUnique: async (currentSlug, { document, getClient }) => {
        const client = getClient({ apiVersion: API_VERSION });
        if (!document) {
          /* Keep TS happy */
          throw new Error('There was no document provided by the context');
        }
        if (document._type === 'genericPage') {
          /* Validate pages are unique amongst special pages */
          if (Object.values(SingletonPageSlugs).includes(currentSlug)) {
            return false;
          }
          /* Validate pages are unique amongst other generic pages & hard-coded pages */
          const otherPages = await client.fetch(
            `*[
              _type == "genericPage"
              && _id != $documentId
              && !(_id in path("drafts.**"))
            ]{ slug }`,
            { documentId: document._id.replace('drafts.', '') },
          );
          const otherPageSlugs = otherPages.map((page) => page.slug.current);
          if (otherPageSlugs.includes(currentSlug)) {
            return false;
          }
          return true;
        } else {
          /* Validate sub-pages are unique amongst siblings */
          const parentPage = await client.fetch(
            `*[_type == "genericPage" && $subPageId in subPages[]._ref]{
            subPages[]->{ _id, title, slug }
          }[0]`,
            { subPageId: document._id },
          );

          if (!parentPage) return true;
          const siblingSlugs = parentPage.subPages
            .filter((subPage) => subPage._id !== document._id)
            .map((subPage) => subPage.slug.current);

          if (siblingSlugs.includes(currentSlug)) {
            return false;
          }
          return true;
        }
      },
    },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'seo',
    title: 'SEO',
    type: 'seo',
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
    select: { title: 'title' },
    prepare: ({ title }) => ({ title }),
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
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'subPage' as const }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title }),
  },
});
