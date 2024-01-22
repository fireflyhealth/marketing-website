import { Rule, defineField, defineType } from 'sanity';
import { linkableDocumentTypes } from '../../lib/constants';

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

/**
 * Use this field when defining document relationships that will
 * be used to create links on the frontend.
 */
export const LinkableDocument = defineField({
  name: 'linkableDocument',
  title: 'Linkable Document',
  type: 'reference',
  to: linkableDocumentTypes.map((schemaType) => ({ type: schemaType })),
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
      validation: (Rule) => [validateOnlyOne],
    }),

    defineField({
      name: 'file',
      title: 'Linked File',
      type: 'file',
      // @ts-ignore
      validation: validateOnlyOne,
    }),
  ],
});
