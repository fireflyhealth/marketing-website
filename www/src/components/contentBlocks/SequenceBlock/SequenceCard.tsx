import { FC, useRef } from 'react';
import cn from 'classnames';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import * as SanityTypes from '@/types/sanity';
import { getColorTheme } from '@/utils/theme';
import { Video } from '@/components/Video';
import { Theme } from '@/components/Theme';
import { SequenceCopy } from './SequenceCopy';
import { SequenceCardWrapper, VideoWrapper, CopyWrapper } from './styles';

type Props = {
  card: SanityTypes.SequenceBlockItem;
};

export const SequenceCard: FC<Props> = ({ card }) => {
  const { video, copy, isHighlighted, theme } = card;

  const sequenceCardRef = useRef<HTMLDivElement>(null);

  const { isIntersectingOnce } = useIntersectionObserver(sequenceCardRef, {
    threshold: 0.4,
  });

  return (
    <div ref={sequenceCardRef} className="relative">
      {isHighlighted && theme ? (
        <>
          <div
            className={cn('absolute top-0 left-0 w-full h-full bg-white z-20')}
          />
          <Theme theme={getColorTheme(theme)}>
            <div
              className={cn(
                SequenceCardWrapper,
                'fadeUpElement fadeUpElement--animated',
                isIntersectingOnce ? '' : 'fadeUpElement--inactive',
                'md:p-12 md:flex-row-reverse md:space-x-reverse',
                'lg:space-x-reverse',
              )}
            >
              <div className={cn(VideoWrapper)}>
                <Video
                  video={video}
                  posterSizes={['90vw, 40vw']}
                  autoplay
                  isHighlighted
                />
              </div>
              <div className={cn(CopyWrapper)}>
                <SequenceCopy copy={copy} isHighlighted={isHighlighted} />
              </div>
            </div>
          </Theme>
        </>
      ) : (
        <div
          className={cn(
            SequenceCardWrapper,
            'md:bg-transparent md:py-24 md:flex-row',
          )}
        >
          <div
            className={cn(
              VideoWrapper,
              'fadeUpElement fadeUpElement--animated lg:max-w-[580px]',
              isIntersectingOnce ? '' : 'fadeUpElement--inactive',
            )}
          >
            <Video video={video} posterSizes={['90vw, 40vw']} autoplay />
          </div>
          <div
            className={cn(
              CopyWrapper,
              'px-12 theme-bg-color',
              'md:py-6',
              'lg:max-w-[580px]',
            )}
          >
            <div
              className={cn(
                'fadeUpElement fadeUpElement--animated',
                isIntersectingOnce ? '' : 'fadeUpElement--inactive',
              )}
            >
              <SequenceCopy copy={copy} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
