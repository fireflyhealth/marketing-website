import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Video } from '@/components/Video';
import { Theme, ColorTheme } from '@/components/Theme';
import { SequenceCopy } from './SequenceCopy';
import { SequenceCardWrapper, VideoWrapper, CopyWrapper } from './styles';

type Props = {
  card: SanityTypes.SequenceBlockItem;
};

export const SequenceCard: FC<Props> = ({ card }) => {
  const { video, copy, theme, flipAlignment, isHighlighted } = card;

  const colorTheme = (colorTheme: string) => {
    switch (colorTheme) {
      case 'White':
        return ColorTheme.White;
      case 'Grey':
        return ColorTheme.Grey;
      case 'Sienna':
        return ColorTheme.Sienna;
      case 'Midnight':
        return ColorTheme.Midnight;
      case 'Sky':
        return ColorTheme.Sky;
      default:
        return ColorTheme.White;
    }
  };
  return (
    <>
      {isHighlighted ? (
        <Theme theme={colorTheme(theme)}>
          <div
            className={cn(
              SequenceCardWrapper,
              'theme-bg-color',
              'md:p-12 md:flex-row-reverse md:space-x-reverse',
              'lg:space-x-reverse',
            )}
          >
            <div className={cn(VideoWrapper)}>
              <Video video={video} posterSizes={['90vw, 40vw']} />
            </div>
            <div className={cn(CopyWrapper)}>
              <SequenceCopy copy={copy} />
            </div>
          </div>
        </Theme>
      ) : (
        <div
          className={cn(
            SequenceCardWrapper,
            flipAlignment
              ? 'md:flex-row-reverse md:space-x-reverse'
              : 'md:flex-row',
            'md:py-24',
          )}
        >
          <div className={cn(VideoWrapper, 'lg:max-w-[580px]')}>
            <Video video={video} posterSizes={['90vw, 40vw']} />
          </div>
          <div className={cn(CopyWrapper, 'lg:max-w-[580px] px-12')}>
            <SequenceCopy copy={copy} />
          </div>
        </div>
      )}
    </>
  );
};
