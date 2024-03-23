import React, { FC, useCallback, useEffect, useState } from 'react';
import { Mutation, SanityClient, useFormValue } from 'sanity';
import { Dialog, Box, Grid, Code, Text, Button } from '@sanity/ui';
import {
  AsteriskIcon,
  ErrorOutlineIcon,
  RemoveCircleIcon,
} from '@sanity/icons';
import { API_VERSION, Status } from '../constants';
import { DocumentWithSlug, VariantFieldInputProps } from '../types';
import { useMemoizedClient } from '../hooks/useMemoizedClient';
import { useRequest } from '../hooks/useRequest';
import { filterMaybes, toDraftId, toPublishedId } from '../utils';
import { InfoBox } from './InfoBox';
import { LoadingSpinner } from './LoadingSpinner';

/**
 * Requests
 */

const requests = {
  getVariantDocument: async (
    client: SanityClient,
    parentDocumentId?: string,
    variantDocumentId?: string,
  ) => {
    if (!parentDocumentId) {
      throw new Error('Parent document has no ID');
    }
    if (!variantDocumentId) {
      throw new Error(
        `Document ${parentDocumentId} does not have a variant document`,
      );
    }
    const variantDocument = await client.fetch(
      `*[_id == $variantDocumentId][0]`,
      {
        variantDocumentId: toPublishedId(variantDocumentId),
      },
    );
    if (!variantDocument) {
      throw new Error('Could not get variant document');
    }
    return variantDocument;
  },
  removeVariantDocument: async (
    client: SanityClient,
    parentDocumentId?: string,
    variantDocumentId?: string,
  ) => {
    if (!parentDocumentId) {
      throw new Error('Parent document has no ID');
    }
    if (!variantDocumentId) {
      throw new Error(
        `Document ${parentDocumentId} does not have a variant document`,
      );
    }

    const [publishedDocument, draftDocument] = await Promise.all([
      client.fetch(`*[_id == $id]{_id}[0]`, {
        id: toPublishedId(parentDocumentId),
      }),
      client.fetch(`*[_id == $id]{_id}[0]`, {
        id: toDraftId(parentDocumentId),
      }),
    ]);

    const operations: Mutation[] = filterMaybes([
      publishedDocument
        ? {
            patch: {
              id: toPublishedId(parentDocumentId),
              unset: ['documentVariantInfo'],
            },
          }
        : null,
      draftDocument
        ? {
            patch: {
              id: toDraftId(parentDocumentId),
              unset: ['documentVariantInfo'],
            },
          }
        : null,
      {
        delete: {
          id: variantDocumentId,
        },
      },
    ]);

    const result = await client.transaction(operations).commit();
    return result;
  },
};

/**
 * Input for a Variant document
 * - render a back link
 */

export const PrimaryDocumentWithVariantInput: FC<VariantFieldInputProps> = (
  props,
) => {
  const client = useMemoizedClient({ apiVersion: API_VERSION });
  const parentDocument = useFormValue([]) as DocumentWithSlug;
  const parentDocumentId = parentDocument?._id;
  const variantDocumentId = props.value?.variantDocument?._ref;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const closeConfirmDialog = () => setConfirmDialogOpen(false);
  const openConfirmDialog = () => setConfirmDialogOpen(true);

  const getVariantDocument = useCallback(
    () =>
      requests.getVariantDocument(client, parentDocumentId, variantDocumentId),
    [client, variantDocumentId, parentDocumentId],
  );

  const removeVariantDocument = useCallback(
    () =>
      requests.removeVariantDocument(
        client,
        parentDocumentId,
        variantDocumentId,
      ),
    [client, variantDocumentId, parentDocumentId],
  );

  const [removeVariantRequest, triggerRemoveVariantRequest] = useRequest(
    removeVariantDocument,
  );
  const [variantDocumentRequest] = useRequest(getVariantDocument, {
    triggerImmediately: true,
  });

  useEffect(() => {
    if (
      removeVariantRequest.status === Status.Fulfilled ||
      removeVariantRequest.status === Status.Rejected
    ) {
      closeConfirmDialog();
    }
  }, [removeVariantRequest.status]);

  if (
    variantDocumentRequest.status === Status.Idle ||
    variantDocumentRequest.status === Status.Pending
  ) {
    return <InfoBox icon={LoadingSpinner}>Loading..</InfoBox>;
  }

  if (variantDocumentRequest.status === Status.Rejected) {
    return (
      <InfoBox tone="critical" icon={ErrorOutlineIcon}>
        {variantDocumentRequest.errorMessage}
      </InfoBox>
    );
  }

  const bVariantIsEnabled =
    variantDocumentRequest.result?.documentVariantInfo.isActive;
  const removeRequestIsPending = removeVariantRequest.status === Status.Pending;
  return (
    <div>
      {removeVariantRequest.status === Status.Rejected ? (
        <InfoBox icon={ErrorOutlineIcon} tone="caution">
          An error occurred when removing the B content document:
          <Box marginTop={3} marginBottom={2}>
            <Code size={1} style={{ whiteSpace: 'wrap' }}>
              <span
                style={{
                  color: 'red',
                  maxWidth: '100%',
                }}
              >
                {removeVariantRequest.errorMessage}
              </span>
            </Code>
          </Box>
        </InfoBox>
      ) : null}
      {confirmDialogOpen ? (
        <Dialog
          id="delete-b-confirm"
          header="Delete B Content"
          onClose={closeConfirmDialog}
        >
          <Box padding={4}>
            <Box marginBottom={4}>
              <Text muted={removeRequestIsPending} size={2}>
                Are you sure you want to remove the B content variant? This will
                delete the B content document and apply changes to the published
                version of this document. It cannot be undone.
              </Text>
              <Box marginTop={4}>
                <Text muted size={2}>
                  Note: If you want to preserve the B content document but not
                  serve it to viewers, you can toggle the "Active" setting to
                  false on that document.
                </Text>
              </Box>
            </Box>
            <Grid gap={2} columns={2}>
              <Button
                disabled={removeRequestIsPending}
                onClick={triggerRemoveVariantRequest}
                icon={
                  removeRequestIsPending ? LoadingSpinner : RemoveCircleIcon
                }
                text="Confirm"
                tone="critical"
              />
              <Button
                disabled={removeRequestIsPending}
                onClick={closeConfirmDialog}
                text="Cancel"
                mode="ghost"
              />
            </Grid>
          </Box>
        </Dialog>
      ) : null}
      <div
        style={{
          /* fudge over some default spacing */
          marginBottom: '-3rem',
        }}
      >
        {bVariantIsEnabled ? (
          <InfoBox icon={AsteriskIcon}>
            The associated B Content document is active
          </InfoBox>
        ) : (
          <InfoBox icon={ErrorOutlineIcon} tone="caution">
            The associated B Content document has been configured but is not
            enabled. B segment viewers will not see this content.
          </InfoBox>
        )}
      </div>
      {props.renderDefault(props)}
      <Box marginTop={3}>
        <Button
          onClick={openConfirmDialog}
          mode="ghost"
          tone="caution"
          padding={3}
          icon={RemoveCircleIcon}
          text="Remove B Content variant"
        />
      </Box>
    </div>
  );
};
