import { FC } from 'react';
import cn from 'classnames';
import { OverlapDoubleImages as OverlapDoubleImagesType } from '@/types/sanity';
import { SanityImage } from '@/atoms/Image/SanityImage';

type Props = {
  overlapDoubleImages: OverlapDoubleImagesType;
};

export const OverlapDoubleImages: FC<Props> = ({ overlapDoubleImages }) => {
  return (
    <div
      className={cn(
        'OverlapDoubleImages flex flex-col md:flex-row px-4 md:px-8 lg:px-12',
      )}
    >
      {overlapDoubleImages.images.map((image, index) => {
        return (
          <div
            key={image._type}
            className={cn(`OverlapDoubleImages__image-${index}`)}
          >
            <SanityImage image={image} sizes={['100vw', '50vw']} />
          </div>
        );
      })}
    </div>
  );
};
