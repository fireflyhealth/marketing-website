import React, { FC } from 'react';
import { ChildContentBlock as ChildContentBlockType } from '@/types/sanity';
import { ImageChildBlock } from '../ImageChildBlock';
import { RichTextChildBlock } from '../RichTextChildBlock';
import { QuoteChildBlock } from '../QuoteChildBlock';
import { BigNumbersChildBlock } from '../BigNumbersChildBlock';
import { BigNumberChildBlock } from '../BigNumberChildBlock';
import { CTACardChildBlock } from '../CTACardChildBlock';
import { VideoChildBlock } from '../VideoChildBlock';
import { HeaderContentChildBlock } from '../HeaderContentChildBlock';
import { HeaderQrCodeChildBlock } from '../HeaderQrCodeChildBlock';

type ChildContentBlockProps = {
  block: ChildContentBlockType;
  imagePriority?: boolean;
  blockNumber: 1 | 2;
};

export const ChildContentBlock: FC<ChildContentBlockProps> = ({
  block,
  imagePriority,
  blockNumber,
}) => {
  switch (block._type) {
    case 'imageChildBlock':
      return (
        <ImageChildBlock
          imageChildBlock={block}
          imagePriority={imagePriority}
        />
      );
    case 'richTextChildBlock':
      return (
        <RichTextChildBlock
          richTextChildBlock={block}
          imagePriority={imagePriority}
        />
      );
    case 'quoteChildBlock':
      return (
        <QuoteChildBlock
          quoteChildBlock={block}
          imagePriority={imagePriority}
        />
      );
    case 'bigNumbers':
      return <BigNumbersChildBlock bigNumbers={block} />;
    case 'bigNumber':
      return <BigNumberChildBlock bigNumber={block} />;
    case 'ctaCard':
      return (
        <CTACardChildBlock ctaCard={block} imagePriority={imagePriority} />
      );
    case 'videoChildBlock':
      return (
        <VideoChildBlock
          videoChildBlock={block}
          imagePriority={imagePriority}
        />
      );
    case 'headerContentChildBlock':
      return (
        <HeaderContentChildBlock
          blockNumber={blockNumber}
          headerContentChildBlock={block}
          imagePriority={imagePriority}
        />
      );
    case 'headerQrCodeChildBlock':
      return (
        <HeaderQrCodeChildBlock
          headerQrCodeChildBlock={block}
          imagePriority={imagePriority}
        />
      );
    default:
      console.warn(
        // @ts-expect-error
        `"${block._type.toString()} is not a valid content block type"`,
      );
  }
};
