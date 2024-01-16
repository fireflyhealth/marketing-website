import { Maybe } from '@/types/sanity';

/**
 * Returns a typed array filtered of null or undefined values
 */
export const filterMaybes = <T>(arr?: (Maybe<T> | undefined)[]): T[] =>
  arr
    ? arr.reduce<T[]>(
        (prev, i) => (i !== null && i !== undefined ? [...prev, i] : prev),
        [],
      )
    : [];
