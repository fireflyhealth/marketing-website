import { FC } from 'react';
import * as SanityTypes from '@/types/sanity';
import { Video } from '../Video';

type Props = {
  videoHeader: SanityTypes.VideoHeader;
};

export const VideoHeader: FC<Props> = ({ videoHeader }) => {
  const { video, eyebrow, heading, body } = videoHeader;
  return (
    <Video
      video={video}
      posterSizes={['93vw']}
      showTitleCard
      titleCardProps={{ eyebrow, heading, body }}
    />
  );
};
