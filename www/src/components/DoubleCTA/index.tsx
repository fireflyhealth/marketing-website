import { FC } from 'react';
import cn from 'classnames';
import { Link } from '@/atoms/Link';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import * as SanityTypes from '@/types/sanity';
import {
  Wrapper,
  BackgroundColor,
  CTA_Container,
  CTA_Card,
  Card_Label,
  CTA,
  Label,
} from './styles';

type Props = {
  doubleCta: SanityTypes.DoubleCtaBlock | SanityTypes.GlobalDoubleCta;
};

export const DoubleCTA: FC<Props> = ({ doubleCta }) => {
  const { ctaOne, ctaTwo } = doubleCta;

  return (
    <div className={cn(Wrapper)}>
      <div className={cn(BackgroundColor)} />
      <div className={cn(CTA_Container)}>
        <Link link={ctaOne.link}>
          <div className={cn(CTA_Card)}>
            <div className={cn(Card_Label)}>{ctaOne.eyebrow}</div>
            <div className={cn(CTA)}>
              <div className={cn(Label)}>{ctaOne.label}</div>
              <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
            </div>
          </div>
        </Link>
        <Link link={ctaTwo.link}>
          <div className={cn(CTA_Card)}>
            <div className={cn(Card_Label)}>{ctaTwo.eyebrow}</div>
            <div className={cn(CTA)}>
              <div className={cn(Label)}>{ctaTwo.label}</div>
              <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
