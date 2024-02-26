import React, { FC } from 'react';
import { Carousel } from '@/components/Carousel';

import { ImageCarouselBlock as ImageCarouselBlockType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { ContentBlockWrapper } from '../ContentBlockWrapper';

type ImageCarouselBlockProps = {
  imageCarouselBlock: ImageCarouselBlockType;
  /* Temporary for QA */
  vwHeightSetting?: number;
  vwHeightEnabled?: boolean;
};

export const ImageCarouselBlock: FC<ImageCarouselBlockProps> = ({
  imageCarouselBlock,
  vwHeightEnabled,
  vwHeightSetting,
}) => {
  const { images, header, subnav } = imageCarouselBlock;
  return (
    <ContentBlockWrapper id={subnav?.contentBlockId} header={header}>
      <Carousel vwHeightSetting={vwHeightEnabled ? vwHeightSetting : undefined}>
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
    </ContentBlockWrapper>
  );
};
