import * as Sanity from 'sanity';
import { API_VERSION } from './constants';

export async function isUniqueAcrossDocuments(
  slug: string,
  context: Sanity.SlugValidationContext,
) {
  const client = await context.getClient({ apiVersion: API_VERSION });
  const id = context.document?._id.replace(/^drafts\./, '');
  const schemaType = context.document?._type;
  const lang = context.document?.language;
  const params = { draft: `drafts.${id}`, published: id, slug };
  const query = `*[
          _type in "${schemaType}"
          && !(_id in [$draft, $published])
          && language == ${lang ? lang : 'en'}
          && slug.current == $slug
        ][0]{ _type }`;
  const result = await client.fetch(query, params);
  return !result;
}
