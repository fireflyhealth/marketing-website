import { TypeReference, defineField, defineType } from 'sanity';
import { VariantFieldInput } from '../components/VariantFieldInput';
import { VARIANTS_FIELD_TYPE_NAME } from '../constants';
import { FieldOptions } from '../types';

type CreateFieldParams = {
  /* Possible types that can be referenced by this field
   * (The component will ensure that the referenced document's
   * type matches that of its partner)*/
  schemaTypes: string[];
};

/**
 * Create a Variant field schema definition for a document type.
 *
 * Used internally in the plugin to add field type definitions.
 * Each eligible document type results in one field, i.e.
 * { name: 'documentVariant-blogArticle', type: 'object', ... }
 */
export const createDocumentVariantFieldDefinition = ({
  schemaTypes,
}: CreateFieldParams) => {
  const refToTypes: TypeReference[] = schemaTypes.map((type) => ({ type }));
  return defineType({
    name: VARIANTS_FIELD_TYPE_NAME,
    title: 'Document Variant',
    type: 'object',
    fields: [
      defineField({
        name: 'label',
        type: 'string',
        components: {
          /* "Hide" this field with null components.
           * If all fields in an object have hidden: true, the parent object will
           * not render at all. */
          input: () => null,
          field: () => null,
        },
      }),
      defineField({
        /* Will only be populated if isVariant == true */
        name: 'variantOf',
        title: 'A Content',
        type: 'reference',
        readOnly: true,
        to: refToTypes,
        hidden: (props) => {
          if (props.parent?.variantOf?._ref) {
            return false;
          }
          return true;
        },
      }),
      defineField({
        /* Will only be populated if isVariant == false */
        name: 'variantDocument',
        title: 'B Content',
        type: 'reference',
        weak: true,
        readOnly: true,
        to: refToTypes,
        hidden: (props) => {
          if (props.parent?.variantDocument?._ref) {
            return false;
          }
          return true;
        },
      }),
      defineField({
        name: 'isActive',
        type: 'boolean',
        title: 'Active',
        description:
          'Enable this setting to serve this content to B segment viewers',
        hidden: (props) => {
          if (props.parent?.variantOf?._ref) {
            return false;
          }
          return true;
        },
        components: {
          input: (props) => (
            <div
              style={{
                /* fudge over some default spacing */
                marginTop: '-3rem',
              }}
            >
              {props.renderDefault(props)}
            </div>
          ),
        },
      }),
    ],
    components: {
      // @ts-ignore
      input: VariantFieldInput,
    },
  });
};

/**
 * Create a document field definition for a schema type.
 *
 * The schemaType argument must be the same as the document type.
 * If it is not, the plugin will render a configuration error warning.
 *
 * Used in document field definitions, i.e.:
 * export const BlogArticle = defineType({
 *  name: 'blogArticle',
 *  type: 'document',
 *  title: 'Blog Article',
 *  fields: [
 *    createDocumentVariantField('blogArticle'),
 *    defineField({
 *      name: 'title',
 *      type: 'Title',
 *      // ...
 *    })
 *    // ...
 *  ]
 **/
export const createDocumentVariantField = (options?: FieldOptions) => {
  return defineField({
    name: VARIANTS_FIELD_TYPE_NAME,
    title: 'A/B Document Variant',
    type: VARIANTS_FIELD_TYPE_NAME,
    /* Provide contextual information for the plugin. */
    options,
  });
};
