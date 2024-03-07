import { FC } from 'react';
import { VideoBlock as VideoBlockType } from '@/types/sanity';

type Props = {
  videoBlock: VideoBlockType;
};

export const VideoBlock: FC<Props> = ({ videoBlock }) => {
  return <div>Video Block</div>;
};
