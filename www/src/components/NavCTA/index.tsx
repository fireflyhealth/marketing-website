import { FC } from 'react';
import cn from 'classnames';
import { DoubleCta } from '@/types/sanity';
import { DoubleCTA } from '../DoubleCTA';
import { Wrapper, BackgroundColor, CTAWrapper } from './styles';

type Props = {
  globalDoubleNav: DoubleCta;
};

export const NavCTA: FC<Props> = ({ globalDoubleNav }) => {
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(BackgroundColor)} />
      <div className={cn(CTAWrapper)}>
        <DoubleCTA doubleCta={globalDoubleNav} />
      </div>
    </div>
  );
};
