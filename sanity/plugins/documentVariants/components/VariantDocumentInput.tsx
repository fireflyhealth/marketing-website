import React, { FC, useCallback } from 'react';
import { SanityClient, SanityDocument, useFormValue } from 'sanity';
import { ErrorOutlineIcon, HelpCircleIcon } from '@sanity/icons';
import { API_VERSION, Status } from '../constants';
import { VariantFieldInputProps } from '../types';
import { useMemoizedClient } from '../hooks/useMemoizedClient';
import { useRequest } from '../hooks/useRequest';
import { toPublishedId } from '../utils';
import { InfoBox } from './InfoBox';
import { LoadingSpinner } from './LoadingSpinner';

/**
 * Requests
 */

const requests = {
  getPrimaryDocument: async (
    client: SanityClient,
    parentDocumentId: string,
    primaryDocumentId?: string,
  ): Promise<SanityDocument> => {
    if (!primaryDocumentId) {
      throw new Error(
        `Document ${parentDocumentId} is not a variant of a primary document`,
      );
    }
    const primaryDocument = await client.fetch<SanityDocument>(
      `*[_id == $primaryDocumentId][0]`,
      {
        primaryDocumentId: toPublishedId(primaryDocumentId),
      },
    );
    if (!primaryDocument) {
      throw new Error('Could not get primary document');
    }
    return primaryDocument;
  },
};

/**
 * Input for a Variant document
 * - render a back link
 */
export const VariantDocumentInput: FC<VariantFieldInputProps> = (props) => {
  const client = useMemoizedClient({ apiVersion: API_VERSION });
  const parentDocument = useFormValue([]) as SanityDocument;
  const primaryDocumentId = props.value?.variantOf?._ref;
  const getPrimaryDocument = useCallback(
    () =>
      requests.getPrimaryDocument(
        client,
        parentDocument._id,
        primaryDocumentId,
      ),
    [client, parentDocument._id, primaryDocumentId],
  );

  const [primaryDocumentRequest] = useRequest(getPrimaryDocument, {
    triggerImmediately: true,
  });

  if (
    primaryDocumentRequest.status === Status.Idle ||
    primaryDocumentRequest.status === Status.Pending
  ) {
    return <InfoBox icon={LoadingSpinner}>Loading..</InfoBox>;
  }

  if (primaryDocumentRequest.status === Status.Rejected) {
    return (
      <InfoBox tone="critical" icon={ErrorOutlineIcon}>
        {primaryDocumentRequest.errorMessage}
      </InfoBox>
    );
  }

  return (
    <div>
      <div
        style={{
          /* fudge over some default spacing */
          marginBottom: '-3rem',
        }}
      >
        <InfoBox icon={HelpCircleIcon}>
          This document is the B version of:
        </InfoBox>
      </div>
      {props.renderDefault(props)}
    </div>
  );
};
