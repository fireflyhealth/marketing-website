import React, { FC } from 'react';
import { ImageBlock as ImageBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

type ImageBlockProps = {
  imageBlock: ImageBlockType;
};

export const ImageBlock: FC<ImageBlockProps> = ({ imageBlock }) => {
  const { header, image } = imageBlock;
  return (
    <ContentBlockWrapper header={header}>
      <SanityImage image={image} sizes="100vw" />
    </ContentBlockWrapper>
  );
};
