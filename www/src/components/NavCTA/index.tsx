import { FC } from 'react';
import cn from 'classnames';
import { DoubleCta } from '@/types/sanity';
import { DoubleCTA } from '../DoubleCTA';
import { Wrapper, BackgroundColor, CTAWrapper } from './styles';

type Props = {
  globalDoubleNav: DoubleCta;
  isOpen: boolean;
};

export const NavCTA: FC<Props> = ({ globalDoubleNav, isOpen }) => {
  return (
    <div
      aria-hidden={!isOpen}
      className={cn(Wrapper, {
        'opacity-0 pointer-events-none': !isOpen,
      })}
      tabIndex={isOpen ? 0 : -1}
    >
      <div className={cn(BackgroundColor)} />
      <div className={cn(CTAWrapper)}>
        <DoubleCTA doubleCta={globalDoubleNav} />
      </div>
    </div>
  );
};
