import React, { FC } from 'react';
import cn from 'classnames';
import { CTACard as CTACardType } from '@/types/sanity';
import { CTACard } from '@/components/Cards/CTACard';

type CTACardChildBlockProps = {
  ctaCard: CTACardType;
};

export const CTACardChildBlock: FC<CTACardChildBlockProps> = ({ ctaCard }) => (
  <div className={cn('ChildBlockWrapper')}>
    <CTACard ctaCard={ctaCard} />
  </div>
);
