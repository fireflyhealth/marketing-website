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

    if (!!cur.subnav) {
      return acc.concat([cur.subnav]);
    }
    return acc;
  }, []);
};
