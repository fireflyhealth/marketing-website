import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import { VideoChildBlock as VideoChildBlockType } from '@/types/sanity';

const Video = dynamic(() => import('@/components/Video'), {
  ssr: false,
});

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
