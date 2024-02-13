/**
 * Convert Block Content to rich text
 */
export function richTextToString(blocks = []) {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        // @ts-ignore
        if (block._type !== 'block' || !block.children) {
          return '';
        }
        // loop through the children spans, and join the
        // text strings
        // @ts-ignore
        return block.children.map((child) => child.text).join('');
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
  );
}
