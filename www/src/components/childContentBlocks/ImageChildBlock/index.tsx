import React, { FC } from 'react';
import cn from 'classnames';
import { ImageChildBlock as ImageChildBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';

type ImageChildBlockProps = {
  imageChildBlock: ImageChildBlockType;
};

export const ImageChildBlock: FC<ImageChildBlockProps> = ({
  imageChildBlock,
}) => {
  const { image } = imageChildBlock;
  return (
    <SanityImage
      sizes={['100vw', '50vw']}
      image={image}
      rounded={false}
      className={cn('rounded-2xl')}
    />
  );
};
