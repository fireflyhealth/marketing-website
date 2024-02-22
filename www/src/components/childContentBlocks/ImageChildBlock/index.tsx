import React, { FC } from 'react';
import { ImageChildBlock as ImageChildBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';

type ImageChildBlockProps = {
  imageChildBlock: ImageChildBlockType;
};

export const ImageChildBlock: FC<ImageChildBlockProps> = ({
  imageChildBlock,
}) => {
  const { image } = imageChildBlock;
  return <SanityImage sizes={['100vw', '50vw']} image={image} />;
};
