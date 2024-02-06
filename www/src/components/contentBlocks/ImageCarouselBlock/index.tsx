import React, { FC } from 'react';
import {
  Carousel,
  NextButton,
  PrevButton,
  Slide,
  SlideContainer,
} from '@/components/Carousel';

import { ImageCarouselBlock as ImageCarouselBlockType } from '@/types/sanity';
import { BrandedIcon } from '@/svgs/BrandedIcon';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

type ImageCarouselBlockProps = {
  imageCarouselBlock: ImageCarouselBlockType;
};

export const ImageCarouselBlock: FC<ImageCarouselBlockProps> = ({
  imageCarouselBlock,
}) => {
  const { images, header } = imageCarouselBlock;
  return (
    <ContentBlockWrapper header={header}>
      <Carousel slideCount={images.length}>
        <SlideContainer>
          {images.map((image, index) => (
            <Slide key={image._key} slideIndex={index}>
              <div
                className={
                  index !== images.length - 1
                    ? 'h-full mr-4 md:mr-12'
                    : 'h-full'
                }
              >
                <SanityImage image={image} sizes={['90vw', '70vw']} />
              </div>
            </Slide>
          ))}
        </SlideContainer>
        <PrevButton>
          <BrandedIcon type="arrow-left" wrapperStyles="w-12" />
        </PrevButton>
        <NextButton>
          <BrandedIcon type="arrow-right" wrapperStyles="w-12" />
        </NextButton>
      </Carousel>
    </ContentBlockWrapper>
  );
};
