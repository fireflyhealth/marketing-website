import { useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { LinkableDocumentType } from '@/types/sanity';
import { Status } from '@/constants';
import * as Sanity from '@/lib/sanity';
import { isLinkableDocumentType } from '@/utils/linking';
import { PreviewProps, createPreviewClient } from '@/lib/sanity/previews';

type Observable = ReturnType<(typeof Sanity.client)['listen']>;

type PreviewQueryCallbacks = {
  listen: (draftId: string) => Observable;
  getPreviewData: (draftId: string) => Promise<PreviewProps>;
};

export const getPreviewQueryCallbacks = (
  type: LinkableDocumentType,
  previewClient: ReturnType<typeof createPreviewClient>,
): PreviewQueryCallbacks => {
  /* Coerce this so we can leverage exhaustive checking
   * below. */

  const coercedType = type as LinkableDocumentType;
  switch (coercedType) {
    case 'homepage':
      return {
        listen: previewClient.homepage.listen,
        getPreviewData: previewClient.homepage.getPreviewData,
      };
    case 'blog':
      return {
        listen: previewClient.blog.listen,
        getPreviewData: previewClient.blog.getPreviewData,
      };
    case 'downloadPage':
      return {
        listen: previewClient.downloadPage.listen,
        getPreviewData: previewClient.downloadPage.getPreviewData,
      };
    case 'contactPage':
      return {
        listen: previewClient.contactPage.listen,
        getPreviewData: previewClient.contactPage.getPreviewData,
      };
    case 'faqPage':
      return {
        listen: previewClient.faqPage.listen,
        getPreviewData: previewClient.faqPage.getPreviewData,
      };
    case 'genericPage':
      return {
        listen: previewClient.genericPage.listen,
        getPreviewData: previewClient.genericPage.getPreviewData,
      };
    case 'subPage':
      return {
        listen: previewClient.subPage.listen,
        getPreviewData: previewClient.subPage.getPreviewData,
      };
    case 'blogArticle':
      return {
        listen: previewClient.blogArticle.listen,
        getPreviewData: previewClient.blogArticle.getPreviewData,
      };
    case 'clientPage':
      return {
        listen: previewClient.clientPage.listen,
        getPreviewData: previewClient.clientPage.getPreviewData,
      };
    case 'practitioner':
      return {
        listen: previewClient.homepage.listen,
        getPreviewData: previewClient.homepage.getPreviewData,
      };
    default:
      /* Make sure we can get the config for all linkable document types
       * (this will bug us to add preview config any time a new type is
       * added to LinkableDocument) */
      throw new Error(
        // @ts-expect-error
        `"${coercedType.toString()}" is not a linkable document type`,
      );
  }
};

type State =
  | { status: Status.Idle }
  | {
      status: Status.Pending;
      /* Props may or may not be present.
       * They will not be until the initial full fetch has
       * finished, but they will be while new requests
       * are fetching */
      previewProps?: PreviewProps;
    }
  | {
      status: Status.Fulfilled;
      previewProps: PreviewProps;
    }
  | {
      status: Status.Rejected;
      errorMessage: string;
    };

type FetchStartAction = { type: 'fetchStart' };
type FetchSuccessAction = {
  type: 'fetchSuccess';
  previewProps: PreviewProps;
};
type RejectedAction = { type: 'rejected'; errorMessage: string };

type Action = FetchStartAction | FetchSuccessAction | RejectedAction;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'fetchStart':
      return {
        ...state,
        status: Status.Pending,
      };
    case 'fetchSuccess':
      return {
        ...state,
        status: Status.Fulfilled,
        previewProps: action.previewProps,
      };
    case 'rejected':
      return {
        status: Status.Rejected,
        errorMessage: action.errorMessage,
      };
  }
};

export const usePreviewData = (): State => {
  const [state, dispatch] = useReducer(reducer, { status: Status.Idle });
  const router = useRouter();
  const documentIdParam = router.query.documentId;
  const previewTokenParam = router.query.previewToken;

  const initialize = async (documentId: string, previewToken: string) => {
    const previewClient = createPreviewClient(previewToken);
    const documentType = await previewClient.document.getType(documentId);

    if (!documentType) {
      dispatch({
        type: 'rejected',
        errorMessage: `Could not fetch document with id "${documentId}"`,
      });
      return;
    }
    if (!isLinkableDocumentType(documentType)) {
      dispatch({
        type: 'rejected',
        errorMessage: `Documents of type "${documentType}" cannot be previewed`,
      });
      return;
    }
    const { listen, getPreviewData } = getPreviewQueryCallbacks(
      documentType,
      previewClient,
    );
    const fetchPreviewData = () =>
      getPreviewData(documentId).then((previewProps) => {
        dispatch({ type: 'fetchSuccess', previewProps });
      });
    await fetchPreviewData();
    listen(documentId).subscribe(async () => {
      dispatch({ type: 'fetchStart' });
      /* Once we receive an update, wait 1 second before attempting
       * a full fetch. Sometimes if we query too fast, the returned
       * data is stale. */
      setTimeout(fetchPreviewData, 1000);
    });
  };

  useEffect(() => {
    /* We need to wait for a full render cycle before the router knows anything
     * about query params */
    if (!router.isReady) return;

    if (!documentIdParam) {
      dispatch({
        type: 'rejected',
        errorMessage: 'No documentId param was provided',
      });
      return;
    }

    if (typeof documentIdParam !== 'string') {
      dispatch({
        type: 'rejected',
        errorMessage: 'documentId parameter was not of type "string"',
      });
      return;
    }
    if (!previewTokenParam) {
      dispatch({
        type: 'rejected',
        errorMessage: 'No previewToken param was provided',
      });
      return;
    }

    if (typeof previewTokenParam !== 'string') {
      dispatch({
        type: 'rejected',
        errorMessage: 'previewToken parameter was not of type "string"',
      });
      return;
    }
    /* Once we have a valid params, initialize the listener */
    initialize(documentIdParam, previewTokenParam);
  }, [router.isReady, documentIdParam, previewTokenParam]);
  return state;
};
