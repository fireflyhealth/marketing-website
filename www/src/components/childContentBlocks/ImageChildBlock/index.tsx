import React, { FC } from 'react';
import cn from 'classnames';
import { ImageChildBlock as ImageChildBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';

type ImageChildBlockProps = {
  imageChildBlock: ImageChildBlockType;
  imagePriority?: boolean;
};

export const ImageChildBlock: FC<ImageChildBlockProps> = ({
  imageChildBlock,
  imagePriority,
}) => {
  const { image } = imageChildBlock;
  return (
    <SanityImage
      sizes={['93vw', '50vw']}
      image={image}
      rounded={false}
      className={cn('rounded-2xl')}
      priority={imagePriority}
    />
  );
};
