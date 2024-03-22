import React, { FC } from 'react';
import { VideoChildBlock as VideoChildBlockType } from '@/types/sanity';
import { Video } from '@/components/Video';

type VideoChildBlockProps = {
  videoChildBlock: VideoChildBlockType;
  imagePriority?: boolean;
};

export const VideoChildBlock: FC<VideoChildBlockProps> = ({
  videoChildBlock,
  imagePriority,
}) => {
  return (
    <Video
      video={videoChildBlock.video}
      posterSizes={['100vw', '50vw']}
      showTitleCard={false}
      posterImagePriority={imagePriority}
    />
  );
};
