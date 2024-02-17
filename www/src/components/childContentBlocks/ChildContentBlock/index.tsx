import React, { FC } from 'react';
import { ChildContentBlock as ChildContentBlockType } from '@/types/sanity';
import { ImageChildBlock } from '../ImageChildBlock';
import { RichTextChildBlock } from '../RichTextChildBlock';

type ChildContentBlockProps = {
  block: ChildContentBlockType;
};

export const ChildContentBlock: FC<ChildContentBlockProps> = ({ block }) => {
  switch (block._type) {
    case 'imageChildBlock':
      return <ImageChildBlock imageChildBlock={block} />;
    case 'richTextChildBlock':
      return <RichTextChildBlock richTextChildBlock={block} />;
    case 'bigNumbers':
      return <p>bigNumbers</p>;
    default:
      console.warn(
        // @ts-expect-error
        `"${block._type.toString()} is not a valid content block type"`,
      );
  }
};
