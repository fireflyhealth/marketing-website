import React, { FC } from 'react';
import { ContentBlock as ContentBlockType, KeyedArray } from '@/types/sanity';
import { ImageBlock } from '../ImageBlock';
import { ImageCarouselBlock } from '../ImageCarouselBlock';
import { CTACardsBlock } from '../CTACardsBlock';
import { PractitionersBlock } from '../PractitionersBlock';
import { ImageTextOverlapBlock } from '../ImageTextOverlapBlock';
import { QuoteBlock } from '../QuoteBlock';

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
    case 'practitionersBlock':
      return <PractitionersBlock practitionersBlock={block} />;
    case 'imageTextOverlapBlock':
      return <ImageTextOverlapBlock imageTextOverlapBlock={block} />;
    case 'quoteBlock':
      return <QuoteBlock quoteBlock={block} />;
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
