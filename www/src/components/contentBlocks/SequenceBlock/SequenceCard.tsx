import { FC } from 'react';
import cn from 'classnames';
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

  return (
    <>
      {isHighlighted && theme ? (
        <Theme theme={getColorTheme(theme)}>
          <div
            className={cn(
              SequenceCardWrapper,
              'md:p-12 md:flex-row-reverse md:space-x-reverse',
              'lg:space-x-reverse',
            )}
          >
            <div className={cn(VideoWrapper)}>
              <Video video={video} posterSizes={['90vw, 40vw']} />
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
            <Video video={video} posterSizes={['90vw, 40vw']} />
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
    </>
  );
};
