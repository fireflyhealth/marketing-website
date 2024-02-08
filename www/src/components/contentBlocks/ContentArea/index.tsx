import React, { FC } from 'react';
import { ContentBlock as ContentBlockType, KeyedArray } from '@/types/sanity';
import { ImageBlock } from '../ImageBlock';
import { ImageCarouselBlock } from '../ImageCarouselBlock';
import { CTACardsBlock } from '../CTACardsBlock';

type ContentBlockProps = {
  block: ContentBlockType;
};

const ContentBlock: FC<ContentBlockProps> = ({ block }) => {
  switch (block._type) {
    case 'imageBlock':
      return <ImageBlock imageBlock={block} />;
    case 'imageCarouselBlock':
      return <ImageCarouselBlock imageCarouselBlock={block} />;
    case 'ctaCardsBlock':
      return <CTACardsBlock ctaCardsBlock={block} />;
    default:
      console.warn(
        // @ts-expect-error
        `"${block._type.toString()} is not a valid content block type"`,
      );
  }
};

type ContentAreaProps = {
  blocks: KeyedArray<ContentBlockType>;
};

export const ContentArea: FC<ContentAreaProps> = ({ blocks }) => (
  <>
    {blocks.map((block) => (
      <ContentBlock block={block} key={block._key} />
    ))}
  </>
);
