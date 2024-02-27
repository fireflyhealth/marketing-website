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

/**
 * Removes '-' and capitalizes first letter in string passed to the function.
 */
export function normalizeString(str: string) {
  str = str.replace(/-/g, ' ');
  return str.charAt(0).toUpperCase() + str.slice(1);
}
