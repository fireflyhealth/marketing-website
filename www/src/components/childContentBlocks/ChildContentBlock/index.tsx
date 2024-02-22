import React, { FC } from 'react';
import { ChildContentBlock as ChildContentBlockType } from '@/types/sanity';
import { ImageChildBlock } from '../ImageChildBlock';
import { RichTextChildBlock } from '../RichTextChildBlock';
import { QuoteChildBlock } from '../QuoteChildBlock';
import { BigNumbersChildBlock } from '../BigNumbersChildBlock';

type ChildContentBlockProps = {
  block: ChildContentBlockType;
};

export const ChildContentBlock: FC<ChildContentBlockProps> = ({ block }) => {
  switch (block._type) {
    case 'imageChildBlock':
      return <ImageChildBlock imageChildBlock={block} />;
    case 'richTextChildBlock':
      return <RichTextChildBlock richTextChildBlock={block} />;
    case 'quoteChildBlock':
      return <QuoteChildBlock quoteChildBlock={block} />;
    case 'bigNumbers':
      return <BigNumbersChildBlock bigNumbers={block} />;
    default:
      console.warn(
        // @ts-expect-error
        `"${block._type.toString()} is not a valid content block type"`,
      );
  }
};
