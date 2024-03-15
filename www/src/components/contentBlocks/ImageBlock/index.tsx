import React, { FC } from 'react';
import { ImageBlock as ImageBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import cn from 'classnames';

type ImageBlockProps = {
  imageBlock: ImageBlockType;
};

export const ImageBlock: FC<ImageBlockProps> = ({ imageBlock }) => {
  const { header, image, subnav, alignCenter } = imageBlock;
  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <div
        className={cn({
          'flex flex-col items-center': alignCenter,
        })}
      >
        <SanityImage image={image} sizes="100vw" />
      </div>
    </ContentBlockWrapper>
  );
};
