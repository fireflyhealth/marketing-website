import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { CTA_Container } from './styles';
import { LargeCtaCard } from './LargeCtaCrd';

type Props = {
  doubleCta: SanityTypes.DoubleCtaBlock | SanityTypes.DoubleCtaBase;
};

export const DoubleCTA: FC<Props> = ({ doubleCta }) => {
  const { ctaOne, ctaTwo } = doubleCta;

  return (
    <div className={cn(CTA_Container)}>
      <LargeCtaCard cta={ctaOne} />
      <LargeCtaCard cta={ctaTwo} />
    </div>
  );
};
