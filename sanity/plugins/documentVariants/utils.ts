import speakingurl from 'speakingurl';
import {
  DocumentWithSlug,
  DocumentWithVariantInfo,
  GetCloneData,
} from './types';
import { VARIANTS_FIELD_LABEL } from './constants';
/**
 * Use the same default slugify utility used by Sanity's slug field. See:
 * https://github.com/sanity-io/sanity/blob/6c894c32638af71df94f7d135650e18caa65e3d0/packages/sanity/src/core/form/inputs/Slug/utils/slugify.ts#L14
 */
export const slugify = speakingurl;

export const toPublishedId = (id: string): string =>
  id.replace(/^drafts\./, '');
export const toDraftId = (id: string): string =>
  id.startsWith('drafts.') ? id : `drafts.${id}`;

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Returns a typed array filtered of null or undefined values
 */
export type Maybe<T> = null | undefined | T;
export const filterMaybes = <T>(arr: Maybe<(Maybe<T> | undefined)[]>): T[] =>
  arr
    ? arr.reduce<T[]>(
        (prev, i) => (i !== null && i !== undefined ? [...prev, i] : prev),
        [],
      )
    : [];

/**
 * Clone a document with unique slug data
 */
export const cloneWithUniqueSlug: GetCloneData = (
  parentDocument: DocumentWithSlug,
) => {
  const parentDocumentSlug: Maybe<string> = parentDocument?.slug?.current;
  if (!parentDocumentSlug) {
    throw new Error(
      'The primary document must have a valid slug before it can be cloned',
    );
  }
  return {
    ...parentDocument,
    slug: {
      _type: 'slug',
      current: [parentDocumentSlug, slugify(VARIANTS_FIELD_LABEL)].join('-'),
    },
  };
};

/**
 * Determines if a document is a variant of another document.
 * Useful for making fields read-only.
 */
export const isVariantDocument = (doc?: DocumentWithVariantInfo) => {
  if (doc?.documentVariantInfo && Boolean(doc.documentVariantInfo.variantOf)) {
    return true;
  }
  return false;
};
