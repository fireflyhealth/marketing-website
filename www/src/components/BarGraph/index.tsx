import { FC, useEffect, useRef } from 'react';
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
  const barTwoSize = Math.round(350 * (barTwo.unit / barOne.unit));
  const barRef = useRef<HTMLDivElement>(null);

  // Tailwind compiles styles at compile time
  // so we handle dynamic sizing with root variables.
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--bar-graph-height',
      `${barTwoSize}px`,
    );
  }, [barTwoSize]);

  useEffect(() => {
    if (!barRef.current) return;

    const barOneWidth = barRef.current.clientWidth;

    const barTwoWidth = Math.round(barOneWidth * (barTwo.unit / barOne.unit));

    document.documentElement.style.setProperty(
      '--bar-graph-width',
      `${barTwoWidth}px`,
    );
  }, [barRef, barOne, barTwo]);
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(BarItem)}>
        <div className={cn(BarOneUnit, 'hidden lg:block lg:mb-3')}>
          {barOne.unit}%
        </div>
        <div
          ref={barRef}
          className={cn(Bar, 'bg-yellow w-full h-full', 'lg:h-[350px]')}
        >
          <p className={cn(Description)}>{barOne.description}</p>
          <div className={cn(BarOneUnit, 'lg:hidden')}>{barOne.unit}%</div>
        </div>
      </div>
      <div className={cn(BarItem)}>
        <div className={cn(BarTwoUnit, 'hidden lg:block lg:mb-3')}>
          {barTwo.unit}%
        </div>
        <div
          className={cn(
            Bar,
            `min-w-[30%] w-bar-graph-width lg:w-full lg:h-bar-graph-height lg:min-h-[56px]`,
            'bg-grey-medium',
          )}
        >
          <p className={cn(Description, 'opacity-70')}>{barTwo.description}</p>
          <div className={cn(BarTwoUnit, 'lg:hidden')}>{barTwo.unit}%</div>
        </div>
      </div>
    </div>
  );
};
