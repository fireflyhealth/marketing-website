import React, { FC } from 'react';
import cn from 'classnames';
import { QuoteChildBlock as QuoteChildBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { Wrapper, Quote, Attribution } from './styles';

type QuoteChildBlockProps = {
  quoteChildBlock: QuoteChildBlockType;
};

export const QuoteChildBlock: FC<QuoteChildBlockProps> = ({
  quoteChildBlock,
}) => {
  const { quote, attribution, badgeImage } = quoteChildBlock.quote;
  return (
    <div className={cn('ChildBlockWrapper', Wrapper)}>
      {badgeImage ? (
        <div className="pb-9">
          <SanityImage width={120} image={badgeImage} sizes={['120px']} />
        </div>
      ) : null}
      <div className={cn(Quote)}>{quote}</div>
      <div className={cn(Attribution)}>
        <div>{attribution.label}</div>
        <div>{attribution.labelSubtitle}</div>
      </div>
    </div>
  );
};
