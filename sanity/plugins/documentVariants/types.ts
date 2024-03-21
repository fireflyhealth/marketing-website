import {
  ObjectInputProps,
  ObjectSchemaType,
  Reference,
  SanityDocument,
} from 'sanity';

export type DocumentWithSlug = SanityDocument & {
  slug?: {
    current?: string;
  };
};

export type VariantFieldValue = {
  isVariant?: boolean;
  label?: string;
  variantOf?: Reference;
  variantDocument?: Reference;
};

/* NOTE: This is typed as Record<string, never> for now, which is odd
 * and doesn't seem helpful, but leave it as-is for now.
 *
 * In the future, we can use this type to define options passed
 * into createDocumentVariantField and have them typed as props
 * passed to the input component. */
export type FieldOptions = Record<string, never>;

export interface VariantFieldSchema extends ObjectSchemaType {
  options: FieldOptions;
}

export type VariantFieldInputProps = ObjectInputProps<
  VariantFieldValue,
  VariantFieldSchema
>;
