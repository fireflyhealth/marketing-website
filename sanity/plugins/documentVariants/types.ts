import {
  ObjectInputProps,
  ObjectSchemaType,
  Reference,
  SanityClient,
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

export type GetCloneDataContext = {
  client: SanityClient;
  fieldOptions: FieldOptions;
};

export type GetCloneData = (
  parentDocument: SanityDocument,
  context: GetCloneDataContext,
) => Record<string, any> | Promise<Record<string, any>>;

export type FieldOptions = {
  cloneOptions?: {
    /* A function that allows you to return custom data for the cloned
     * document. Use this to ensure slugs are unique, modify titles,
     * and so on.
     *
     * **Note**:
     * the following fields will always be overriden and cannot be customized:
     * _id, _type, _rev, _createdAt, _updatedAt, documentVariantInfo */
    getCloneData?: GetCloneData;
    /* Choose fields to be omitted from the cloned data */
    omitFields?: string[];
  };
};

export interface VariantFieldSchema extends ObjectSchemaType {
  options: FieldOptions;
}

export type VariantFieldInputProps = ObjectInputProps<
  VariantFieldValue,
  VariantFieldSchema
>;
