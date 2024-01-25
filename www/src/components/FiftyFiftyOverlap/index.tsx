import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Wrapper, Heading, Title, Description } from './styes';

export type Props = {
  fiftyFiftyOverlap: SanityTypes.FiftyFiftyOverlap;
};

export const FiftyFiftyOverlap: FC<Props> = ({ fiftyFiftyOverlap }) => {
  const { heading } = fiftyFiftyOverlap;
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(Heading)}>
        <h2 className={cn(Title)}>{heading.componentTitle}</h2>
        <h6 className={cn(Description)}>{heading.componentDescription}</h6>
      </div>
    </div>
  );
};
