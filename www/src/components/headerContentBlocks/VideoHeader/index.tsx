import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Video } from '../../Video';
import { Wrapper } from './styles';
import { Theme } from '@/components/Theme';

type Props = {
  videoHeader: SanityTypes.VideoHeader;
};

export const VideoHeader: FC<Props> = ({ videoHeader }) => {
  const { video, eyebrow, heading, body, theme } = videoHeader;

  return (
    <Theme theme={theme}>
      <div className={cn(Wrapper)}>
        <Video
          video={video}
          posterSizes={['93vw']}
          showTitleCard
          titleCardProps={{ eyebrow, heading, body }}
        />
      </div>
    </Theme>
  );
};
