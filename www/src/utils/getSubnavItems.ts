import { SubnavItem, ContentBlock } from '@/types/sanity';

export const getSubnavItems = (
  content?: ContentBlock[],
): SubnavItem[] | null => {
  if (!content) {
    return null;
  }

  return content.reduce((acc: SubnavItem[], cur: ContentBlock) => {
    /* Divider block is one off block tha doesn't hace subnav */
    if (cur._type === 'dividerBlock') {
      return acc;
    }

    /* Only include contet blocks that have a subnav label and content block ID */
    /* Some content blocks make use of the content block ID for in-page linking but do not require a subnav item. */
    if (!!cur.subnav && !!cur.subnav.label && !!cur.subnav.contentBlockId) {
      return acc.concat([cur.subnav]);
    }
    return acc;
  }, []);
};
