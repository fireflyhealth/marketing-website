import React, { FC } from 'react';
import cn from 'classnames';
import { CTACardsBlock as CTACardsBlockType } from '@/types/sanity';
import { CTACard } from '@/components/Cards/CTACard';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { CardsWrapper } from './styles';

type CTACardsBlockProps = {
  ctaCardsBlock: CTACardsBlockType;
};

export const CTACardsBlock: FC<CTACardsBlockProps> = ({ ctaCardsBlock }) => {
  const { header, ctaCards, subnav } = ctaCardsBlock;

  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <div
        className={cn('CTACardsBlock', CardsWrapper, 'pb-4 md:pb-8 lg:pb-12', {
          'pt-4 md:pt-8 lg:pt-12': !header,
        })}
      >
        {ctaCards.map((ctaCard) => (
          <CTACard ctaCard={ctaCard} key={ctaCard._key} />
        ))}
      </div>
    </ContentBlockWrapper>
  );
};
