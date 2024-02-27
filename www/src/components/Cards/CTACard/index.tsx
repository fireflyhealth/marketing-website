import React, { FC } from 'react';
import cn from 'classnames';
import { CTACard as CTACardType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { CTA } from '@/components/CTA';
import { CardTitle, CardWrapper } from './styles';

type CTACardProps = {
  ctaCard: CTACardType;
};

export const CTACard: FC<CTACardProps> = ({ ctaCard }) => {
  return (
    <div className={cn(CardWrapper)}>
      <SanityImage
        aspectRatio={1}
        sizes={['100vw', '50vw', '35vw']}
        image={ctaCard.image}
      />
      <div className={cn(CardTitle)}>{ctaCard.title}</div>
      <CTA cta={ctaCard.cta} width="auto" align="left" />
    </div>
  );
};
