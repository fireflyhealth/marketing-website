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

  /* If the document is a variant of another, render the VariantDocumentInput:
   * - Displays a back link to the primary document
   * - Displays the isEnabled toggle
   **/
  if (value?.variantOf) {
    return <VariantDocumentInput {...props} />;
  }
  /* Otherwise, it is a primary document */

  /* If it has a varaint, render the PrimaryDocumentWithVariantInput:
   * - Displays information about the active status of the variant document
   * - Displays a "Remove" button which deletes the variant and removes
   *   the variant information from the current document */
  if (value?.variantDocument) {
    return <PrimaryDocumentWithVariantInput {...props} />;
  }
  /* Otherwise, if it is the Primary document, render the PrimaryDocumentInput:
   * - Displays a button to create B Content */
  return <PrimaryDocumentNoVariantsInput {...props} />;
};
