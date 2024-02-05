import { FC } from 'react';
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
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(BarItem)}>
        <div className={cn(BarOneUnit, 'hidden md:block md:mb-3')}>
          {barOne.unit}%
        </div>
        <div className={cn(Bar, 'w-full h-full', 'bg-yellow')}>
          <div className={cn(Description)}>{barOne.description}</div>
          <div className={cn(BarOneUnit, 'md:hidden')}>{barOne.unit}%</div>
        </div>
      </div>
      <div className={cn(BarItem)}>
        <div className={cn(BarTwoUnit, 'hidden md:block md:mb-3')}>
          {barTwo.unit}%
        </div>
        <div
          className={cn(Bar, 'w-[70%] md:w-full md:h-[70%]', 'bg-grey-medium')}
        >
          <div className={cn(Description, 'opacity-70')}>
            {barTwo.description}
          </div>
          <div className={cn(BarTwoUnit, 'md:hidden')}>{barTwo.unit}%</div>
        </div>
      </div>
    </div>
  );
};
