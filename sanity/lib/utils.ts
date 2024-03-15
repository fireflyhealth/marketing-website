import { ValidationContext } from 'sanity';
import { Maybe } from './types';

/**
 * Converts camelCase text into Sentence Case
 * (actually all uppercase words sentence case)
 *
 * frankTheDog => Frank The Dog
 */
export const camelCaseToSentence = (value: string): string => {
  /* Make the first character uppercase */
  const upCased = [value.charAt(0).toUpperCase(), ...value.slice(1)].join('');
  /* Find all sets of strings that start with an upper-case
   * letter and are followed by lower-case */
  const matches = upCased.match(/([A-Z][a-z]+)/g);
  if (!matches) {
    throw new Error(`Could not parse "${value}" to sentence`);
  }
  return Array.from(matches).join(' ');
};

/**
 * Converts snake-case text into Sentence Case
 * (actually all uppercase words sentence case)
 *
 * Removes '-' and capitalizes first letter in string passed to the function.
 *
 * frank-the-dog => Frank The Dog
 */
export function snakeCaseToSentence(str: string) {
  str = str.replace(/-/g, ' ');
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats a sanity date string, i.e. "1986-07-12" -> July 12, 1986
 *
 * (Copied from www/src/utils)
 */
export const formatSanityDate = (date: string) => {
  /* For this website, we can assume that dates entered into Sanity refer
   * to the New York timezone. Here we modify the bare date string
   * (i.e. '2024-02-02') to have an EST offset. */
  const timeZonedDate =
    /* Does the provided date already have a T00:00.00 string? (this is the case when using _updatedAt) */
    /T\d\d:\d\d:\d\d/.test(date)
      ? /* If so, use it as-is (this will occur when using _updatedAt) */
        date
      : /* If not, append a dummy timestamp with a NYT timezone
         * (this will occur when using a sanity { type: date } field)*/
        date.concat('T00:00:00.000-05:00');
  return new Date(timeZonedDate).toLocaleDateString('en-us', {
    /* Here we define the timezone which we want our formatted
     * date to reflect. */
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

type ReducerValue = {
  target: any | null;
  currentItem: Record<string, any>;
};

type Field = any;

/**
 * Used within validators.
 *
 * NOTE: if this feature request is ever fulfilled, we can use
 * this to conditionally hide fields -> https://github.com/sanity-io/sanity/issues/6018
 *
 * Gets the nearest ancestor of the provided type.
 */
const getAncestorOfType = (
  context: ValidationContext,
  ancestorType: string,
): Field | null => {
  const { path, document } = context;
  if (!path || !document) return null;
  const parentBlock = path.reduce<ReducerValue>(
    ({ target, currentItem }, path) => {
      const value =
        typeof path === 'string'
          ? currentItem[path]
          : // @ts-ignore
            currentItem.find((items: any) => items._key === path._key);

      if (
        typeof value !== 'string' &&
        typeof value !== 'number' &&
        typeof value !== 'boolean' &&
        value &&
        '_type' in value &&
        value._type === ancestorType
      ) {
        return {
          target: value,
          currentItem: value,
        };
      }
      return {
        target,
        currentItem: value,
      };
    },
    { target: null, currentItem: document },
  );
  return parentBlock.target;
};

/**
 * Used within validators.
 *
 * NOTE: if this feature request is ever fulfilled, we can use
 * this to conditionally hide fields -> https://github.com/sanity-io/sanity/issues/6018
 *
 * Determine if the current field has an ancestor of the provided type.
 */

export const hasAncestorOfType = (
  context: ValidationContext,
  ancestorType: string,
) => Boolean(getAncestorOfType(context, ancestorType));
