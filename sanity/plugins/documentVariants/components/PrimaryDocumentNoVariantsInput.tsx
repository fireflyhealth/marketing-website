import React, { FC, useCallback, useEffect } from 'react';
import { Card, Button } from '@sanity/ui';
import { CopyIcon } from '@sanity/icons';
import {
  PatchEvent,
  SanityClient,
  SanityDocument,
  set,
  useFormValue,
} from 'sanity';
import omit from 'lodash/omit';
import { FieldOptions, VariantFieldInputProps } from '../types';
import {
  API_VERSION,
  Status,
  VARIANTS_FIELD_LABEL,
  VARIANTS_FIELD_TYPE_NAME,
} from '../constants';
import { filterMaybes, sleep, slugify, toPublishedId } from '../utils';
import { useRequest } from '../hooks/useRequest';
import { useMemoizedClient } from '../hooks/useMemoizedClient';
import { ValidationMessage } from './ValidationMessage';

/**
 * Requests
 */

/**
 * Clones the primary document and updates the primary document's 'variant'
 * field with the appropriate information
 */
const requests = {
  cloneDocument: async (
    client: SanityClient,
    onChange: VariantFieldInputProps['onChange'],
    parentDocument: SanityDocument,
    fieldOptions: FieldOptions,
  ) => {
    const optionsOmitFields = fieldOptions?.cloneOptions?.omitFields || [];
    const optionsGetCloneData = fieldOptions?.cloneOptions?.getCloneData;
    /* Get a cloned version of the document */
    const clonedDocument = optionsGetCloneData
      ? /* Use the field options to get this data if provided */
        await optionsGetCloneData(parentDocument, { client, fieldOptions })
      : /* Otherwise use the parent document as-is */
        parentDocument;

    /* Strip out fields we do not want to clone */
    const clonedDocumentData = omit({ ...clonedDocument }, [
      '_id',
      '_rev',
      '_type',
      '_createdAt',
      '_updatedAt',
      'documentVariantInfo',
      ...optionsOmitFields,
    ]);
    /* Create a draft version of the primary document if it does not already exist */
    /* Create the variant document */
    const newVariantDocument = await client.createOrReplace({
      ...clonedDocumentData,
      _id: [
        toPublishedId(parentDocument._id),
        slugify(VARIANTS_FIELD_LABEL),
      ].join('-'),
      _type: parentDocument._type,
      documentVariantInfo: {
        _type: VARIANTS_FIELD_TYPE_NAME,
        label: VARIANTS_FIELD_LABEL,
        isActive: false,
        variantOf: {
          _type: 'reference',
          _ref: toPublishedId(parentDocument._id),
        },
      },
    });
    /* Update the current field's 'variantDocument' field */
    /* NOTE: We use the field's onChange prop passed to the input component
     * instead of client.patch - this will update the field value
     * on a draft document */
    onChange(
      PatchEvent.from(
        set({
          variantDocument: {
            _type: 'reference',
            _ref: toPublishedId(newVariantDocument._id),
            _weak: true,
          },
        }),
      ),
    );

    return;
  },

  /* Attempts to fetch the published version of this document */
  getPublishedDocument: async (client: SanityClient, documentId: string) => {
    /**
     * NOTE: for some reason, the preview component is unmounted
     * and re-mounted while the document in the first second of rendering.
     * This causes a weird flash where the button goes from enabled to disabled
     * to enabled. This sleep(1000) "fixes" that by making the check for
     * the published document take longer than that initial period
     */
    await sleep(1000);
    return client.fetch(`*[_id == $documentId]{_id}[0]`, {
      documentId: toPublishedId(documentId),
    });
  },
};

/**
 * If the document is a primary document (isVariant == false), render:
 *
 *   If the document has no variants, a button to create one
 *
 *   If the document has variants, a link and option to remove
 *   it and delete the variant.
 */

export const PrimaryDocumentNoVariantsInput: FC<VariantFieldInputProps> = (
  props,
) => {
  const client = useMemoizedClient({ apiVersion: API_VERSION });
  const parentDocument = useFormValue([]) as SanityDocument;

  /**
   * Memoize our two requests
   */
  const cloneDocument = useCallback(
    () =>
      requests.cloneDocument(
        client,
        props.onChange,
        parentDocument,
        props.schemaType.options,
      ),
    [client, parentDocument, props.onChange, props.schemaType.options],
  );
  const getPublishedDocument = useCallback(
    () => requests.getPublishedDocument(client, parentDocument._id),
    [client, parentDocument._id],
  );

  /**
   * Get the state and triggers for making the requests
   */
  const [createVariantState, triggerCreateVariantDocument] =
    useRequest(cloneDocument);

  const [publishedDocumentState, triggerGetPublishedDocumentState] =
    useRequest(getPublishedDocument);

  useEffect(() => {
    triggerGetPublishedDocumentState();
  }, [parentDocument._id, triggerGetPublishedDocumentState]);

  const documentIsPublished =
    publishedDocumentState.status === Status.Fulfilled &&
    publishedDocumentState.result !== null;

  const validationMessages: string[] = filterMaybes([
    /* Ensure that the primary document has been published */
    !documentIsPublished && publishedDocumentState.status === Status.Fulfilled
      ? 'This document must be published before it can be cloned'
      : null,
    createVariantState.status === Status.Rejected
      ? createVariantState.errorMessage
      : null,
  ]);

  /**
   * Disable the clone button if there are validation issues
   * or either request is pending
   */
  const isDisabled = Boolean(
    publishedDocumentState.status === Status.Idle ||
      publishedDocumentState.status === Status.Pending ||
      !documentIsPublished ||
      createVariantState.status === Status.Pending,
  );

  return (
    <div>
      <Button
        disabled={isDisabled}
        onClick={triggerCreateVariantDocument}
        mode="ghost"
        icon={CopyIcon}
        text="Create B Content Variant"
      />
      {validationMessages.length ? (
        <Card marginY={2} paddingX={2} tone="caution" border>
          {validationMessages.map((message) => (
            <ValidationMessage key={message} message={message} />
          ))}
        </Card>
      ) : null}
      {props.renderDefault(props)}
    </div>
  );
};
