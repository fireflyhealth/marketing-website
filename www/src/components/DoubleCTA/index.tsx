import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Wrapper, BackgroundColor, CTA_Container } from './styles';
import { LargeCtaCard } from './LargeCtaCrd';

type Props = {
  doubleCta: SanityTypes.DoubleCtaBlock | SanityTypes.GlobalDoubleCta;
};

export const DoubleCTA: FC<Props> = ({ doubleCta }) => {
  const { ctaOne, ctaTwo } = doubleCta;

  return (
    // <div className={cn(Wrapper)}>
    //   <div className={cn(BackgroundColor)} />
    //   <div className={cn(CTA_Container)}>
    //     <LargeCtaCard cta={ctaOne} />
    //     <LargeCtaCard cta={ctaTwo} />
    //   </div>
    // </div>
    <div className={cn(CTA_Container)}>
      <LargeCtaCard cta={ctaOne} />
      <LargeCtaCard cta={ctaTwo} />
    </div>
  );
};
