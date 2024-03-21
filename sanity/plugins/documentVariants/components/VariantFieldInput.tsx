import React, { FC } from 'react';
import { VariantFieldInputProps } from '../types';
import { PrimaryDocumentNoVariantsInput } from './PrimaryDocumentNoVariantsInput';
import { VariantDocumentInput } from './VariantDocumentInput';
import { PrimaryDocumentWithVariantInput } from './PrimaryDocumentWithVariantInput';

/**
 * Main component
 */

export const VariantFieldInput: FC<VariantFieldInputProps> = (props) => {
  const { value } = props;

  /* If the document is a variant of another, render the VariantDocumentInput */
  if (value?.variantOf) {
    return <VariantDocumentInput {...props} />;
  }

  if (value?.variantDocument) {
    return <PrimaryDocumentWithVariantInput {...props} />;
  }
  /* Otherwise, if it is the Primary document, render the PrimaryDocumentInput */
  // , client, parentDocument);
  return <PrimaryDocumentNoVariantsInput {...props} />;
};
