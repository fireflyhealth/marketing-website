import { FC, useState, useMemo, useEffect } from 'react';
import { DocumentPluginOptions, SanityDocument, SchemaType } from 'sanity';
import { useSecrets, SettingsView } from '@sanity/studio-secrets';

import { API_VERSION, linkableDocumentTypes } from './constants';
import { BASE_URL } from './config';

/**
 * Used on sanity.config.ts to populate the "Open Preview" button
 * in the document's three-dot menu
 */

const getProductionUrl = (
  document: { _type: string; _id: string },
  previewToken: string,
): string | null => {
  /* If this document type is not previewable, return nothing */
  if (!linkableDocumentTypes.includes(document._type)) {
    return null;
  }
  return `${BASE_URL}/preview?documentId=${document._id}&previewToken=${previewToken}`;
};

export const resolveProductionUrl: DocumentPluginOptions['productionUrl'] =
  async (_, context) => {
    const { document, getClient } = context;
    const client = getClient({ apiVersion: API_VERSION });
    const secrets = await client.fetch(
      `*[_id == "secrets.${SECRETS_NAMESPACE}"][0]`,
    );
    const previewToken = secrets.secrets[SANITY_PREVIEW_TOKEN_KEY];
    if (!previewToken) {
      console.warn('Could not fetch preview token from secrets');
      return;
    }
    return getProductionUrl(document, previewToken) || undefined;
  };
/*
Copied from type { UserViewComponent } from 'sanity/desk';
*/
type Props = {
  document: {
    draft: SanityDocument | null;
    displayed: Partial<SanityDocument>;
    historical: Partial<SanityDocument> | null;
    published: SanityDocument | null;
  };
  documentId: string;
  schemaType: SchemaType;
};

/**
 * Token management:
 * We are storing/retrieving our Sanity Preview token using Sanity Studio Secrets,
 * which technically stores the token in a private Sanity document,
 * so it's not exposed to the public in the JavaScript bundle of the deployed Studio.
 *
 * To update this token:
 *
 *  - Visit the API settings in the project settings at manage.sanity.io
 *  - Create a new Viewer (read-only) token
 *  - Temporarily set the initial state for showSettings to true
 *  - View a preview pane & update the secret
 *  - Reset the initial state to false
 */
const SECRETS_NAMESPACE = 'sanityPreview';
const SANITY_PREVIEW_TOKEN_KEY = 'preview_token';
const SECRETS_KEYS = [
  {
    key: SANITY_PREVIEW_TOKEN_KEY,
    title: 'Sanity Preview Token',
    description: 'Please only change this if you know what you are doing.',
  },
];
