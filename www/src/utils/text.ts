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
