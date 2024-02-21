/* Yanked and adapted from: https://gist.github.com/max10rogerio/c67c5d2d7a3ce714c4bc0c114a3ddc6e */
export const slugify = (value: string): string =>
  value
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-'); // separator

/**
 * Ensures a string is surrounded by curly quotes
 */
export const toQuotation = (quote: string): string =>
  [
    '“',
    quote
      /* Remove existing beginning & end quotation marks
       * (straight quotes, single quote, curly quotes) */
      .replace(/^["'“”]/, '')
      .replace(/["'“”]$/, ''),
    '”',
  ].join('');

/**
 * Formats a sanity date string, i.e. "1986-07-12" -> July 12, 1986
 *
 *
 * TODO: this was yanked from Bryan's review component code ReviewItem.tsx,
 * replace that implementation with this function
 */
export const formatSanityDate = (date: string) => {
  /* For this website, we can assume that dates entered into Sanity refer
   * to the New York timezone. Here we modify the bare date string
   * (i.e. '2024-02-02') to have an EST offset. */
  const timeZonedDate = date.concat('T00:00:00.000-05:00');
  return new Date(timeZonedDate).toLocaleDateString('en-us', {
    /* Here we define the timezone which we want our formatted
     * date to reflect. */
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
