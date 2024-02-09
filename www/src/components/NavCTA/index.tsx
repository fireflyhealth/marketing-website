import { FC } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { DoubleCtaBase } from '@/types/sanity';
import { DoubleCTA } from '../DoubleCTA';
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
  globalDoubleNav: DoubleCtaBase;
};

export const NavCTA: FC<Props> = ({ globalDoubleNav }) => {
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(BackgroundColor)} />
      <div className="relative z-[1020]">
        <DoubleCTA doubleCta={globalDoubleNav} />
      </div>
    </div>
  );
};
