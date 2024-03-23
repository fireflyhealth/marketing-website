import { definePlugin } from 'sanity';
import { createDocumentVariantFieldDefinition } from './fields/documentVariant';
import { VARIANTS_FIELD_TYPE_NAME } from './constants';

type PluginConfig = {
  schemaTypes: string[];
};

const DEFUAULT_CONFIG = {};

export const documentVariants = definePlugin<PluginConfig>((config) => {
  const pluginConfig = { ...DEFUAULT_CONFIG, ...config };
  const { schemaTypes } = pluginConfig;

  if (schemaTypes.length === 0) {
    throw new Error(
      'You must specify at least one schema type on which to enable document variants. Update the `schemaTypes` option in the documentVariants() configuration.',
    );
  }
  return {
    name: 'docmentVariants',
    tools: (tools, context) => {
      /* Ensure that all of the schemaTypes we included in the document config
       * actually have the documentVariantInfo field.
       *
       * We aren't actually defining tools, but this is the only plugin option
       * that receives the compiled schema in its context. */
      const invalidTypes = context.schema._original?.types.reduce<string[]>(
        (prevInvalidTypes, type) => {
          if (
            schemaTypes.includes(type.name) &&
            'fields' in type &&
            type.fields
          ) {
            const variantInfoField = type.fields.find(
              (field) =>
                field.name === VARIANTS_FIELD_TYPE_NAME &&
                field.type === VARIANTS_FIELD_TYPE_NAME,
            );
            if (!variantInfoField) {
              return [...prevInvalidTypes, type.name];
            }
          }
          return prevInvalidTypes;
        },
        [],
      );
      if (invalidTypes?.length) {
        throw new Error(
          `The following document types are missing a "${VARIANTS_FIELD_TYPE_NAME}" field: ${invalidTypes.join(
            ', ',
          )}`,
        );
      }

      return tools;
    },
    schema: {
      /* Add additional types to the schema */
      types: (types) => {
        const documentVariantFieldDefinition =
          createDocumentVariantFieldDefinition({ schemaTypes });
        return [...types, documentVariantFieldDefinition];
      },
    },
  };
});
