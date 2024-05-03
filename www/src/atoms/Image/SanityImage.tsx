import React, { FC, useMemo } from 'react';
import {
  ImageCrop,
  ImageDimensions,
  RichImage,
  Image as SanityImageType,
} from '@/types/sanity';
import { imageBuilder } from '@/lib/sanity';
import { GenericImage, GenericImageProps } from './GenericImage';

export type SanityImageProps = Omit<
  GenericImageProps,
  'src' | 'width' | 'height'
> & {
  image: SanityImageType | RichImage;
  width?: number;
  height?: number;
};

const getAspectRatioFromCrop = (
  crop: ImageCrop,
  dimensions: ImageDimensions,
): number => {
  // Calculate the cropped width and height
  const croppedWidth =
    dimensions.width - (crop.left + crop.right) * dimensions.width;
  const croppedHeight =
    dimensions.height - (crop.top + crop.bottom) * dimensions.height;

  // Calculate the aspect ratio
  const aspectRatio = croppedWidth / croppedHeight;

  return aspectRatio;
};

const getCalculatedHeight = (
  image: SanityImageType | RichImage,
  width: number,
): number => {
  const aspectRatio = image.crop
    ? getAspectRatioFromCrop(image.crop, image.asset.metadata.dimensions)
    : image.asset.metadata.dimensions.aspectRatio;

  return width / aspectRatio;
};

const getCalculatedWidth = (
  image: SanityImageType | RichImage,
  height: number,
): number => {
  const aspectRatio = image.crop
    ? getAspectRatioFromCrop(image.crop, image.asset.metadata.dimensions)
    : image.asset.metadata.dimensions.aspectRatio;

  return height * aspectRatio;
};

const getImageProps = (
  image: SanityImageType | RichImage,
  width?: number,
  height?: number,
  aspectRatio?: number,
): Omit<GenericImageProps, 'sizes'> => {
  /* If an aspectRatio is applied, use that to create a crop.
   * Width and height properties will be ignored. */
  if (aspectRatio) {
    const height = image.asset.metadata.dimensions.width * aspectRatio;
    const src = imageBuilder
      .image(image)
      .fit('max')
      .width(Math.round(image.asset.metadata.dimensions.width))
      .height(Math.round(height))
      .url();

    return {
      src,
    };
  }
  if (width && height) {
    const src = imageBuilder
      .image(image)
      .fit('max')
      .width(Math.round(width))
      .height(Math.round(height))
      .url();
    return { src, width, height };
  }
  if (width && !height) {
    /* If there is a width but no height, infer the height from the
     * natural aspect ratio. */
    const calculatedHeight = getCalculatedHeight(image, width);
    const src = imageBuilder
      .image(image)
      .fit('max')
      .width(Math.round(width))
      .height(Math.round(calculatedHeight))
      .url();
    return { src, width, height: calculatedHeight };
  }
  if (height && !width) {
    /* If there is a height but no height, infer the height from the
     * natural aspect ratio. */
    const calculatedWidth = getCalculatedWidth(image, height);
    const src = imageBuilder
      .image(image)
      .fit('max')
      .width(Math.round(calculatedWidth))
      .height(Math.round(height))
      .url();
    return { src, width: calculatedWidth, height };
  }
  /* Otherwise, return just the src and natural dimensions */
  const src = imageBuilder.image(image).url();
  return {
    src,
    width: image.asset.metadata.dimensions.width,
    height: image.asset.metadata.dimensions.height,
  };
};

export const SanityImage: FC<SanityImageProps> = ({
  image,
  width,
  height,
  aspectRatio,
  ...genericImageProps
}) => {
  let builder = imageBuilder.image(image).fit('max');
  if (width) builder = builder.width(width);
  if (height) builder = builder.height(height);

  const {
    src,
    width: imageWidth,
    height: imageHeight,
  } = useMemo(
    () => getImageProps(image, width, height, aspectRatio),
    [image, width, height, aspectRatio],
  );

  const caption = 'caption' in image ? image.caption : undefined;

  return (
    <GenericImage
      src={src}
      sizes={''}
      alt={image.altText}
      caption={caption}
      width={imageWidth}
      height={imageHeight}
      aspectRatio={aspectRatio}
      placeholder="blur"
      blurDataURL={image.asset.metadata.lqip}
      {...genericImageProps}
    />
  );
};
