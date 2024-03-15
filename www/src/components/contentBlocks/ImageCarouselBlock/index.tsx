import React, { FC } from 'react';
import cn from 'classnames';
import { Carousel } from '@/components/Carousel';
import { ImageCarouselBlock as ImageCarouselBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

type ImageCarouselBlockProps = {
  imageCarouselBlock: ImageCarouselBlockType;
};

export const ImageCarouselBlock: FC<ImageCarouselBlockProps> = ({
  imageCarouselBlock,
}) => {
  const { images, header, subnav } = imageCarouselBlock;
  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <div
        className={cn('pb-4 md:pb-8 lg:pb-12', {
          'pt-4 md:pt-8 lg:pt-12': !header,
        })}
      >
        <Carousel isImageCarousel>
          {images.map((image, index) => (
            <div
              key={image._key}
              className={
                index !== images.length - 1 ? 'h-full mr-4 md:mr-12' : 'h-full'
              }
            >
              <SanityImage image={image} sizes={['90vw', '70vw']} />
            </div>
          ))}
        </Carousel>
      </div>
    </ContentBlockWrapper>
  );
};
