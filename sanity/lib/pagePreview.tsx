import { FC, useState, useMemo, useEffect } from 'react';
import { SanityDocument, SchemaType } from 'sanity';
import { useSecrets, SettingsView } from '@sanity/studio-secrets';

import * as Config from './config';

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

const getTypeSegment = (documentType: string | undefined) => {
  if (documentType === 'homepage') return '/';
  if (documentType === 'downloadPage') return '/download';
  if (documentType === 'contactPage') return '/contact';
  if (documentType === 'notFoundPage') return '/404';
  if (documentType === 'faqPage') return '/faq';
  if (documentType === 'clientPage') return '/with';
  if (documentType === 'blog') return '/blog';
  if (documentType === 'blogArticle') return '/blog/article';
  if (documentType === 'subPage') return '/pages/subPage';
  return '/pages';
};

// Token management:
// We are storing/retrieving our Sanity Preview token using Sanity Studio Secrets,
// which technically stores the token in a private Sanity document,
// so it's not exposed to the public in the JavaScript bundle of the deployed Studio.
// We can also update the token directly in Sanity.
const SECRETS_NAMESPACE = 'sanityPreview';
const SANITY_PREVIEW_TOKEN_KEY = 'preview_token';
const SECRETS_KEYS = [
  {
    key: SANITY_PREVIEW_TOKEN_KEY,
    title: 'Sanity Preview Token',
    description: 'Please only change this if you know what you are doing.',
  },
];

const PagePreview: FC<Props> = ({ document }) => {
  const { loading, secrets } = useSecrets<{
    [SANITY_PREVIEW_TOKEN_KEY]: string;
  }>(SECRETS_NAMESPACE);
  const [showSettings, setShowSettings] = useState(false);
  const sanityPreviewToken = secrets
    ? secrets[SANITY_PREVIEW_TOKEN_KEY]
    : undefined;

  useEffect(() => {
    if (!sanityPreviewToken && !loading) {
      setShowSettings(true);
    }
  }, [sanityPreviewToken, loading]);

  const fullSrcUrl = useMemo(() => {
    let src = `${Config.PREVIEW_BASE_URL}${getTypeSegment(document.displayed._type)}`;
    if (
      document.displayed._type !== 'homepage' &&
      document.displayed._type !== 'downloadPage' &&
      document.displayed._type !== 'contactPage' &&
      document.displayed._type !== 'notFoundPage' &&
      document.displayed._type !== 'faqPage'
    )
      src += `/${document.displayed._id}`;

    if (sanityPreviewToken) {
      src = src + `?sanityPreviewToken=${sanityPreviewToken}`;
    }

    return src;
  }, [document, sanityPreviewToken]);

  if (showSettings) {
    return (
      <SettingsView
        title="Show Page Preview"
        namespace={SECRETS_NAMESPACE}
        keys={SECRETS_KEYS}
        onClose={() => {
          setShowSettings(false);
        }}
      />
    );
  }

  return (
    <iframe
      width="100%"
      height="100%"
      title="Sanity Page Preview"
      src={fullSrcUrl}
      style={{ border: 'none' }}
    />
  );
};

export default PagePreview;