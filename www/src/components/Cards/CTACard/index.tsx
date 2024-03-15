import React, { FC } from 'react';
import cn from 'classnames';
import { CTACard as CTACardType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { CTA } from '@/components/CTA';
import { RichText } from '@/components/RichText';
import { CardTitle, CardWrapper, CardBody, CardCta } from './styles';

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
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className={cn(CardTitle)}>{ctaCard.title}</div>
          {ctaCard.body && (
            <RichText
              className={cn(CardBody)}
              content={ctaCard.body}
              fontSize="font-size-8"
            />
          )}
        </div>
        <div className={cn(CardCta)}>
          <CTA cta={ctaCard.cta} width="auto" align="left" />
        </div>
      </div>
    </div>
  );
};
