import { FC } from 'react';
import { useInView } from 'react-hook-inview';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { getColorTheme } from '@/utils/theme';
import { Video } from '@/components/Video';
import { Theme } from '@/components/Theme';
import { SequenceCopy } from './SequenceCopy';
import {
  SequenceCardOpacity,
  SequenceCardWrapper,
  VideoWrapper,
  CopyWrapper,
} from './styles';

type Props = {
  card: SanityTypes.SequenceBlockItem;
};

export const SequenceCard: FC<Props> = ({ card }) => {
  const { video, copy, isHighlighted, theme } = card;

  const [inViewRef, inView] = useInView({
    threshold: 0.2,
    unobserveOnEnter: true,
  });

  return (
    <div
      ref={inViewRef}
      className={cn(SequenceCardOpacity, inView ? 'opacity-100' : 'opacity-0')}
    >
      {isHighlighted && theme ? (
        <Theme theme={getColorTheme(theme)}>
          <div className={cn(SequenceCardWrapper)}>
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
      ) : (
        <div
          className={cn(
            SequenceCardWrapper,
            'md:bg-transparent md:py-24 md:flex-row',
          )}
        >
          <div className={cn(VideoWrapper, 'lg:max-w-[580px]')}>
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
            <SequenceCopy copy={copy} />
          </div>
        </div>
      )}
    </div>
  );
};
