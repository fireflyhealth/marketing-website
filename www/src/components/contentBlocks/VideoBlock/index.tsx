import { FC } from 'react';
import cn from 'classnames';
import { VideoBlock as VideoBlockType } from '@/types/sanity';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { Video } from '@/components/Video';
import { Wrapper } from './styles';

type Props = {
  videoBlock: VideoBlockType;
};

export const VideoBlock: FC<Props> = ({ videoBlock }) => {
  const { header, subnav, video } = videoBlock;
  return (
    <ContentBlockWrapper header={header} id={subnav?.contentBlockId}>
      <div className={cn(Wrapper)}>
        <Video video={video} posterSizes={['65vw, 85vw']} />
      </div>
    </ContentBlockWrapper>
  );
};
