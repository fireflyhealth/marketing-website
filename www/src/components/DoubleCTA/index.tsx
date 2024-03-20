import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { CTAContainer } from './styles';
import { LargeCtaCard } from './LargeCtaCrd';

type Props = {
  doubleCta: SanityTypes.DoubleCta;
};

export const DoubleCTA: FC<Props> = ({ doubleCta }) => {
  const { ctaOne, ctaTwo } = doubleCta;

  return (
    <div className={cn(CTAContainer)}>
      <LargeCtaCard cta={ctaOne} />
      <LargeCtaCard cta={ctaTwo} />
    </div>
  );
};
