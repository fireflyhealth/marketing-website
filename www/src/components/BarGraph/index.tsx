import { FC, useRef, useState, useEffect } from 'react';
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

  // bar graph sizing is based on the taller bar.
  // we use barOneIsTaller to determine if we calculate
  // size based on barOne or barTwo.
  const barOneIsTaller = barOne.unit > barTwo.unit;

  const barOneRef = useRef<HTMLDivElement>(null);
  const barTwoRef = useRef<HTMLDivElement>(null);

  const barOneSize = Math.round(350 * (barOne.unit / barTwo.unit));
  const barTwoSize = Math.round(350 * (barTwo.unit / barOne.unit));

  // Tailwind compiles styles at compile time
  // so we handle dynamic sizing with root variables.
  useEffect(() => {
    if (barOneIsTaller) {
      document.documentElement.style.setProperty(
        '--bar-graph-height',
        `${barTwoSize}px`,
      );
    } else {
      document.documentElement.style.setProperty(
        '--bar-graph-height',
        `${barOneSize}px`,
      );
    }
  }, [barTwoSize]);

  useEffect(() => {
    if (!barOneRef.current || !barTwoRef.current) return;

    const barOneWidth = barOneRef.current.clientWidth;
    const barTwoWidth = barTwoRef.current.clientWidth;

    const newBarOneWidth = Math.round(
      barTwoWidth * (barOne.unit / barTwo.unit),
    );
    const newBarTwoWidth = Math.round(
      barOneWidth * (barTwo.unit / barOne.unit),
    );

    if (barOneIsTaller) {
      document.documentElement.style.setProperty(
        '--bar-graph-width',
        `${newBarTwoWidth}px`,
      );
    } else {
      document.documentElement.style.setProperty(
        '--bar-graph-width',
        `${newBarOneWidth}px`,
      );
    }
  }, [barOneRef, barOne, barTwo]);
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(BarItem)}>
        <div className={cn(BarOneUnit, 'hidden lg:block lg:mb-3')}>
          {barOne.unit}%
        </div>
        <div
          ref={barOneRef}
          className={cn(Bar, 'bg-yellow', {
            'w-full h-full lg:h-[350px]': barOneIsTaller,
            'min-w-[30%] w-bar-graph-width lg:w-full lg:h-bar-graph-height lg:min-h-[56px]':
              !barOneIsTaller,
          })}
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
          ref={barTwoRef}
          className={cn(Bar, 'bg-grey-medium', {
            'w-full h-full lg:h-[350px]': !barOneIsTaller,
            'min-w-[30%] w-bar-graph-width lg:w-full lg:h-bar-graph-height lg:min-h-[56px]':
              barOneIsTaller,
          })}
        >
          <p className={cn(Description, 'opacity-70')}>{barTwo.description}</p>
          <div className={cn(BarTwoUnit, 'lg:hidden')}>{barTwo.unit}%</div>
        </div>
      </div>
    </div>
  );
};
