import React, { FC } from 'react';
import { QuoteChildBlock as QuoteChildBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';

type QuoteChildBlockProps = {
  quoteChildBlock: QuoteChildBlockType;
};

export const QuoteChildBlock: FC<QuoteChildBlockProps> = ({
  quoteChildBlock,
}) => {
  const { quote, attribution, badgeImage } = quoteChildBlock.quote;
  return (
    <div className="text-center">
      {badgeImage ? (
        <div className="pb-9">
          <SanityImage width={120} image={badgeImage} sizes={['120px']} />
        </div>
      ) : null}
      <div className="font-size-6 font-roobert pb-9">{quote}</div>
    </div>
  );
};
