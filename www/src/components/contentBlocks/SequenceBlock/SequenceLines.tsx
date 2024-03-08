import { FC, useRef } from 'react';
import cn from 'classnames';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';

export const SequenceLines: FC = () => {
  const sequenceLinesRef = useRef<HTMLDivElement>(null);

  const { isIntersectingOnce } = useIntersectionObserver(sequenceLinesRef, {
    threshold: 0.1,
  });

  return (
    <div ref={sequenceLinesRef} className="SequenceLines__container">
      <div
        className={cn(
          isIntersectingOnce && 'animate-segmentPoint',
          'SequenceLines__point',
        )}
      />
      <div
        className={cn(
          isIntersectingOnce &&
            'before:animate-topSegmentMobile before:md:animate-topSegmentTabletDesktop',
          'SequenceLines__segment--top',
        )}
      />
      <div className="SequenceLines__col-left" />
      <div className="SequenceLines__col-right">
        <div
          className={cn(
            isIntersectingOnce && 'before:md:animate-middleSegment',
            'SequenceLines__segment--middle',
          )}
        />
      </div>
      <div className="SequenceLines__segment--bottom" />
    </div>
  );
};
