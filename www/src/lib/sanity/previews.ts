import { createClient } from '@sanity/client';
import { config } from '@/config';
import { HomeViewProps } from '@/views/HomeView';
import { Homepage } from '@/types/sanity';
import { pageFragment } from './queries';

/**
 * Constants
 */
type HomePreviewProps = {
  view: 'homepage';
  viewProps: HomeViewProps;
};

export type PreviewProps = HomePreviewProps;

export const createPreviewClient = (previewToken: string) => {
  const previewClient = createClient({
    ...config.sanity,
    useCdn: false,
    withCredentials: true,
    token: previewToken,
  });

  return {
    document: {
      getType: async (id: string): Promise<null> => {
        const document = await previewClient.fetch(
          `*[_id == "${id}"][0]{ _type }`,
        );
        if (!document) return null;
        return document._type;
      },
    },
    homepage: {
      listen: (draftId: string) => {
        return previewClient.listen(
          `*[_type == "homepage" && _id == $draftId][0]`,
          { draftId },
          { visibility: 'query' },
        );
      },
      getPreviewData: async (draftId: string): Promise<HomePreviewProps> => {
        const nonDraftId = draftId.replace(/^drafts./, '');
        const homepage = await previewClient.fetch<Homepage>(
          `*[
             _type == "homepage"
             && (_id == $draftId || _id == $nonDraftId)
           ][0]{${pageFragment}}`,
          { draftId, nonDraftId },
        );
        return { view: 'homepage', viewProps: { homepage } };
      },
    },
  };
};
