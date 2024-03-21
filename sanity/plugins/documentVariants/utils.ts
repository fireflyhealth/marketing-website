import speakingurl from 'speakingurl';
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
