import { FC, useEffect } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import {
  Wrapper,
  BarItem,
  BarOneUnit,
  BarTwoUnit,
  Bar,
  Description,
} from './styles';

type Props = {
  barGraph: SanityTypes.BarGraph;
};

export const BarGraph: FC<Props> = ({ barGraph }) => {
  const { barOne, barTwo } = barGraph;
  const barTwoSize = Math.round((barTwo.unit / barOne.unit) * 100);

  // Tailwind compiles styles at compile time
  // so we handle dynamic sizing with root variables.
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--bar-graph-height',
      `${barTwoSize}%`,
    );
    document.documentElement.style.setProperty(
      '--bar-graph-width',
      `${barTwoSize}%`,
    );
  }, [barTwoSize]);
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(BarItem)}>
        <div className={cn(BarOneUnit, 'hidden md:block md:mb-3')}>
          {barOne.unit}%
        </div>
        <div className={cn(Bar, 'w-full h-full', 'bg-yellow')}>
          <p className={cn(Description)}>{barOne.description}</p>
          <div className={cn(BarOneUnit, 'md:hidden')}>{barOne.unit}%</div>
        </div>
      </div>
      <div className={cn(BarItem)}>
        <div className={cn(BarTwoUnit, 'hidden md:block md:mb-3')}>
          {barTwo.unit}%
        </div>
        <div
          className={cn(
            Bar,
            `w-bar-graph-width md:w-full md:h-bar-graph-height`,
            'bg-grey-medium',
          )}
        >
          <p className={cn(Description, 'opacity-70')}>{barTwo.description}</p>
          <div className={cn(BarTwoUnit, 'md:hidden')}>{barTwo.unit}%</div>
        </div>
      </div>
    </div>
  );
};
