import { FC } from 'react';
import cn from 'classnames';
import { zIndex } from '@/constants';
import { DoubleCtaBase } from '@/types/sanity';
import { DoubleCTA } from '../DoubleCTA';
import { Wrapper, BackgroundColor } from './styles';

type Props = {
  globalDoubleNav: DoubleCtaBase;
};

export const NavCTA: FC<Props> = ({ globalDoubleNav }) => {
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(BackgroundColor)} />
      <div className="relative" style={{ zIndex: `${zIndex.NavCTA}` }}>
        <DoubleCTA doubleCta={globalDoubleNav} />
      </div>
    </div>
  );
};
