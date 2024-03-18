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

// constants for bar height and width
const barHeightDesktop = 350; // px
const minBarHeightDesktop = 56; // px
const minBarWidthMobile = 40; // %

export const BarGraph: FC<Props> = ({ barGraph }) => {
  const { barOne, barTwo } = barGraph;

  // store calculated height and width of smaller bar
  const [barHeight, setBarHeight] = useState<number>(0);
  const [barWidth, setBarWidth] = useState<number>(0);

  // bar graph sizing is based on the taller bar.
  // we use barOneIsTaller to determine if we calculate
  // size based on barOne or barTwo.
  const barOneIsTaller = barOne.unit > barTwo.unit;

  const barOneRef = useRef<HTMLDivElement>(null);
  const barTwoRef = useRef<HTMLDivElement>(null);

  const barOneSize = Math.round(barHeightDesktop * (barOne.unit / barTwo.unit));
  const barTwoSize = Math.round(barHeightDesktop * (barTwo.unit / barOne.unit));

  useEffect(() => {
    if (barOneIsTaller) {
      setBarHeight(barTwoSize);
    } else {
      setBarHeight(barOneSize);
    }
  }, [barOneIsTaller, barOneSize, barTwoSize]);

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
      setBarWidth(newBarTwoWidth);
    } else {
      setBarWidth(newBarOneWidth);
    }
  }, [barOneRef, barOneIsTaller, barOne, barTwo]);

  return (
    <div className={cn(Wrapper)}>
      <div className={cn(BarItem)}>
        <div className={cn(BarOneUnit, 'hidden lg:block lg:mb-3')}>
          {barOne.unit}%
        </div>
        {/* Tailwind compiles styles at compile time so we use TW classes to show and hide each bar item for mobile and desktop breakpoints. */}
        {/* We set dynamic height and width values inside the style attribute. */}
        {/* Height is set for bar items shown on desktop. */}
        {/* Width is set for bar items shown on mobile. */}

        {/* Desktop - controls Height of bar */}
        <div
          ref={barOneRef}
          className={cn(Bar, 'bg-yellow w-full hidden lg:block')}
          style={{
            height: `${
              !barOneIsTaller ? `${barHeight}px` : `${barHeightDesktop}px`
            }`,
            minHeight: `${
              !barOneIsTaller ? `${minBarHeightDesktop}px` : 'unset'
            }`,
          }}
        >
          <p className={cn(Description)}>{barOne.description}</p>
          <div className={cn(BarOneUnit, 'lg:hidden')}>{barOne.unit}%</div>
        </div>

        {/* Mobile - controls width of bar */}
        <div
          ref={barOneRef}
          className={cn(Bar, 'bg-yellow h-full block lg:hidden')}
          style={{
            width: `${!barOneIsTaller ? `${barWidth}px` : '100%'}`,
            minWidth: `${!barOneIsTaller ? `${minBarWidthMobile}%` : 'unset'}`,
          }}
        >
          <p className={cn(Description)}>{barOne.description}</p>
          <div className={cn(BarOneUnit, 'lg:hidden')}>{barOne.unit}%</div>
        </div>
      </div>
      <div className={cn(BarItem)}>
        <div className={cn(BarTwoUnit, 'hidden lg:block lg:mb-3')}>
          {barTwo.unit}%
        </div>
        {/* Tailwind compiles styles at compile time so we use TW classes to show and hide each bar item for mobile and desktop breakpoints. */}
        {/* We set dynamic height and width values inside the style attribute. */}
        {/* Height is set for bar items shown on desktop. */}
        {/* Width is set for bar items shown on mobile. */}

        {/* Desktop - controls height of bar */}
        <div
          ref={barTwoRef}
          className={cn(Bar, 'bg-grey-medium w-full hidden lg:block')}
          style={{
            height: `${
              barOneIsTaller ? `${barHeight}px` : `${barHeightDesktop}px`
            }`,
            minHeight: `${
              barOneIsTaller ? `${minBarHeightDesktop}px` : 'unset'
            }`,
          }}
        >
          <p className={cn(Description, 'opacity-70')}>{barTwo.description}</p>
          <div className={cn(BarTwoUnit, 'lg:hidden')}>{barTwo.unit}%</div>
        </div>

        {/* Mobile - controls width of bar */}
        <div
          ref={barTwoRef}
          className={cn(Bar, 'bg-grey-medium h-full block lg:hidden')}
          style={{
            width: `${barOneIsTaller ? `${barWidth}px` : '100%'}`,
            minWidth: `${barOneIsTaller ? `${minBarWidthMobile}%` : 'unset'}`,
          }}
        >
          <p className={cn(Description, 'opacity-70')}>{barTwo.description}</p>
          <div className={cn(BarTwoUnit, 'lg:hidden')}>{barTwo.unit}%</div>
        </div>
      </div>
    </div>
  );
};
