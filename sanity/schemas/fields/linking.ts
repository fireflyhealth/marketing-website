import { Rule, defineField, defineType } from 'sanity';
import { API_VERSION, linkableDocumentTypes } from '../../lib/constants';
import { Maybe } from '../../lib/types';

/*
 * Validation
 */
const validateOnlyOne = (Rule: Rule) =>
  Rule.custom((value, { parent }) => {
    const fieldsWithValues = [
      (parent as any)?.documentLink,
      (parent as any)?.externalUrl,
      (parent as any)?.file,
    ].filter(Boolean);
    if (fieldsWithValues.length === 0) {
      return 'Required: You must provide either a linked page, external URL, or file.';
    }
    if (fieldsWithValues.length > 1) {
      return 'You must provide only one of: a linked page, external URL, or file.';
    }

    return true;
  });

export const validateNotOrphanedSubpage = (Rule: Rule) =>
  Rule.custom(async (value: Maybe<{ _ref: string }>, context) => {
    if (!value) return true;
    const client = context.getClient({ apiVersion: API_VERSION });

    const linkedPage = await client.fetch(
      `
        *[_id == $refId]{
          _id,
          _type,
          "parentPage": *[
            _type == "genericPage"
            && ^._id in subPages[]._ref
          ] {
            _id,
          }[0],
          category->{
            _id
          }
        }[0]
      `,
      { refId: value._ref },
    );
    if (linkedPage._type === 'subPage' && linkedPage.parentPage === null) {
      return 'Cannot link to an orphaned sub page';
    }
    if (linkedPage._type === 'blogArticle' && linkedPage.category === null) {
      return 'Cannot link to an orphaned blog article';
    }
    return true;
  });

/**
 * Use this field when defining document relationships that will
 * be used to create links on the frontend.
 */
export const LinkableDocument = defineField({
  name: 'linkableDocument',
  title: 'Linkable Document',
  type: 'reference',
  to: linkableDocumentTypes.map((schemaType) => ({ type: schemaType })),
  options: {
    filter: '!defined(documentVariantInfo.variantOf)',
  },
  // @ts-ignore
  validation: (Rule) => [validateNotOrphanedSubpage],
});

export const Link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  description:
    'A link to a page within the site, a file to download, or an external URL.',
  fields: [
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      validation: (Rule) => {
        return validateOnlyOne(Rule as Rule).uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        });
      },
    }),

    defineField({
      name: 'documentLink',
      title: 'Linked Page',
      type: 'linkableDocument',
      validation: (Rule) => [validateOnlyOne, validateNotOrphanedSubpage],
    }),

    defineField({
      name: 'file',
      title: 'Linked File',
      hidden: (ctx) => {
        /* Hide this option when adding links to a Navigation document */
        if (ctx.document?._type == 'navigation') {
          return true;
        }
        return false;
      },
      type: 'file',
      // @ts-ignore
      validation: validateOnlyOne,
    }),
  ],
});
