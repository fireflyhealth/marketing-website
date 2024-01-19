import { ConditionalPropertyCallbackContext } from 'sanity';

export function readOnlyIfNotBaseLang({
  document,
}: ConditionalPropertyCallbackContext) {
  // If the language of the document is anyting other than 'en' then readonly will be true
  // We don't want to allow the slug to be edited in this case
  if (!document?.language) return false;
  if (document?.language != 'en') return true;
  return false;
}
