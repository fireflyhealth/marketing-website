import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { ColorTheme, Theme } from '@/components/Theme';
import { Video } from '../../Video';
import { Wrapper } from './styles';

type Props = {
  videoHeader: SanityTypes.VideoHeader;
};

export const VideoHeader: FC<Props> = ({ videoHeader }) => {
  const { video, eyebrow, heading, body, theme } = videoHeader;

  return (
    <Theme theme={theme || ColorTheme.Sienna}>
      <div className={cn(Wrapper)}>
        <Video
          video={video}
          posterSizes={['93vw']}
          showTitleCard
          titleCardProps={{ eyebrow, heading, body }}
          posterImagePriority={true}
        />
      </div>
    </Theme>
  );
};
