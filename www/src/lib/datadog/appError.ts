/* Add new tags here */
type ErrorCategory = 'nextjs' | 'nearby' | 'sanity';

/**
 * A simple wrapper for more informative errors.
 *
 * This allows us to throw errors with a label & additional contextual
 * data to use in errormonitoring.
 *
 * - Prefer to use this over the default Error class.
 *
 * - Provide at least one tag as the first argument. You can provide single
 *   tags as a string, for example:
 *
 *   throw new AppError('cart', 'Could not add item to cart')
 *   throw new AppError(['cart', 'findify'], 'Could not add item to cart')
 *
 *
 * - Keep error messages free of unique information: this will help keep errors
 *   coming from the same place grouped in the error monitoring dashboard.
 *   Instead, provide details of the error in the context argument.
 *
 *   For example:
 *
 *   do:
 *
 *   throw new AppError(
 *     'yotpo',
 *     'There was an error fetching product reviews',
 *     { productId: product.store.id }
 *   )
 *
 *   don't:
 *
 *   throw new AppError(
 *     'yotpo',
 *     `There was an error fetching product reviews for product ${product.store.id}`,
 *   )
 */
export class AppError extends Error {
  category: string;
  context: Record<string, any>;

  constructor(
    category: ErrorCategory,
    message: string,
    context: Record<string, any> = {},
  ) {
    super(message);
    this.category = category;
    this.context = context;
  }
}
