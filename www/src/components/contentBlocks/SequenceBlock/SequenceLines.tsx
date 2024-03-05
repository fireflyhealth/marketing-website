import { FC } from 'react';
import { useInView } from 'react-hook-inview';
import cn from 'classnames';

export const SequenceLines: FC = () => {
  const [inViewRef, inView] = useInView({
    threshold: 0.1,
    unobserveOnEnter: true,
  });

  return (
    <div ref={inViewRef} className="SequenceLines__container">
      <div
        className={cn(inView && 'animate-segmentPoint', 'SequenceLines__point')}
      />
      <div
        className={cn(
          inView &&
            'before:animate-topSegmentMobile before:md:animate-topSegmentTabletDesktop',
          'SequenceLines__segment--top',
        )}
      />
      <div className="SequenceLines__col-left" />
      <div className="SequenceLines__col-right">
        <div
          className={cn(
            inView && 'before:md:animate-middleSegment',
            'SequenceLines__segment--middle',
          )}
        />
      </div>
      <div className="SequenceLines__segment--bottom" />
    </div>
  );
};
