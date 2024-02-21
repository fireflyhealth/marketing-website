import React, { FC } from 'react';
import cn from 'classnames';
import { CTACardsBlock as CTACardsBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { CTA } from '@/components/CTA';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { CardTitle, CardWrapper, CardsWrapper } from './styles';

type CTACardsBlockProps = {
  ctaCardsBlock: CTACardsBlockType;
};

export const CTACardsBlock: FC<CTACardsBlockProps> = ({ ctaCardsBlock }) => {
  const { header, ctaCards, id } = ctaCardsBlock;

  return (
    <ContentBlockWrapper id={id} header={header}>
      <div className={cn(CardsWrapper)}>
        {ctaCards.map((ctaCard) => (
          <div key={ctaCard._key} className={cn(CardWrapper)}>
            <SanityImage
              aspectRatio={1}
              sizes={['100vw', '50vw', '35vw']}
              image={ctaCard.image}
            />
            <div className={cn(CardTitle)}>{ctaCard.title}</div>
            <CTA cta={ctaCard.cta} width="auto" align="left" />
          </div>
        ))}
      </div>
    </ContentBlockWrapper>
  );
};
