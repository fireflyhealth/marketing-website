import React, { FC, useCallback } from 'react';
import { useFormValue } from 'sanity';
import { ErrorOutlineIcon, HelpCircleIcon } from '@sanity/icons';
import { API_VERSION, Status } from '../constants';
import { DocumentWithSlug, VariantFieldInputProps } from '../types';
import { useMemoizedClient } from '../hooks/useMemoizedClient';
import { useRequest } from '../hooks/useRequest';
import { toPublishedId } from '../utils';
import { InfoBox } from './InfoBox';
import { LoadingSpinner } from './LoadingSpinner';

/**
 * Input for a Variant document
 * - render a back link
 */
export const VariantDocumentInput: FC<VariantFieldInputProps> = (props) => {
  const client = useMemoizedClient({ apiVersion: API_VERSION });
  const parentDocument = useFormValue([]) as DocumentWithSlug;
  const primaryDocumentId = props.value?.variantOf?._ref;
  const getPrimaryDocument = useCallback(async () => {
    if (!primaryDocumentId) {
      throw new Error(
        `Document ${parentDocument._id} is not a variant of a primary document`,
      );
    }
    const primaryDocument = await client.fetch(
      `*[_id == $primaryDocumentId][0]`,
      {
        primaryDocumentId: toPublishedId(primaryDocumentId),
      },
    );
    if (!primaryDocument) {
      throw new Error('Could not get primary document');
    }
    return primaryDocument;
  }, [client, primaryDocumentId, parentDocument._id]);

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
      <InfoBox icon={HelpCircleIcon}>
        This document is the B version of{' '}
        <strong>{primaryDocumentRequest.result.title}</strong>.
      </InfoBox>
      {props.renderDefault(props)}
    </div>
  );
};
