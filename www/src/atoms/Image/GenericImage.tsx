import React, { FC } from 'react';
import cx from 'classnames';
import { ImageProps as NextImageProps } from 'next/image';
import { Maybe } from '@/types/sanity';

/**
 * Converts an array of sizes to a proper "sizes" string.
 *
 * The final value will be used without a breakpoint as the default
 * size.
 *
 * Examples:
 *
 * ['100vw', '80vw', '50vw', '25vw'] =>
 *   '(max-width: 600px) 100vw, (max-width: 800px) 80vw, (max-width: 1024px) 50vw, 25vw'
 *
 * ['100vw', '80vw'] =>
 *   '(max-width: 600px) 100vw, 80vw'
 *
 * ['80vw'] =>
 *   '80vw'
 */
const BREAKPOINTS = [600, 800, 1200];
const parseSizes = (sizes: string[]): string => {
  if (sizes.length > 4) {
    console.warn(
      'You passed more than 4 sizes into <Image />, only the first 4 will be used.',
    );
  }
  const result = sizes
    .slice(0, 4)
    .map((size, index) => {
      if (index === sizes.length - 1) return size;
      const breakpoint = BREAKPOINTS[index];
      return `(max-width: ${breakpoint}px) ${size}`;
    })
    .join(', ');
  return result;
};

export type GenericImageProps = Omit<NextImageProps, 'alt' | 'sizes'> & {
  srcSet?: string;
  alt?: string;
  caption?: Maybe<string>;
  className?: string;
  /* A standard sizes string, i.e.:
   *
   * "(max-width: 600px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 25vw"
   *
   * Alternatively, pass in an array of widths to be parsed into a sizes string.
   *
   * ['100vw', '80vw', '50vw', '25vw'] will result in the same value as the above example.
   * See parseSizes above for more details. */

  sizes: string | string[];
  /* A or a number 0 to 1, i.e. .75 for a 3/4 image */
  aspectRatio?: number;

  /* Almost every image in the Firefly designs have a rounded border.
   * pass in a custom rounded classname to override, or false
   * to disable.
   * Defaults to 'rounded-2xl'. */
  rounded?: string | false;
  priority?: boolean;
};

const GenericImageInner: FC<GenericImageProps> = ({
  srcSet,
  sizes,
  aspectRatio,
  caption,
  className: classNameProp,
  width,
  height,
  rounded = 'rounded-2xl',
  priority,
  ...nextImageProps
}) => {
  const { src } = nextImageProps;
  if (typeof src != 'string') return;

  const sizesString = Array.isArray(sizes) ? parseSizes(sizes) : sizes;

  /* common class name */
  const className = cx(
    'GenericImage',
    rounded ? `${rounded} overflow-hidden` : '',
    classNameProp,
  );

  /**
   * If we have an aspect ratio, apply that style to the wrapping component.
   * We don't need to give next's Image width & height props because we are
   * using fill={true}
   */
  if (aspectRatio) {
    const wrapperStyles =
      typeof aspectRatio === 'string'
        ? { aspectRatio }
        : { paddingBottom: `${aspectRatio * 100}%`, width: '100%' };
    const imageStyles =
      typeof aspectRatio === 'number'
        ? { position: 'absolute' as const, width: '100%', height: '100%' }
        : undefined;
    return (
      <div className={cx('relative', className)} style={wrapperStyles}>
        <img
          alt={nextImageProps.alt || ''}
          src={src}
          sizes={sizesString}
          srcSet={srcSet}
          className="object-center object-cover"
          style={imageStyles}
          loading={!priority ? 'lazy' : undefined}
        />
      </div>
    );
  }

  if (nextImageProps.fill) {
    return (
      <img
        className={cx(className, 'object-cover object-center')}
        src={src}
        sizes={sizesString}
        srcSet={srcSet}
        alt={nextImageProps.alt || ''}
        loading={!priority ? 'lazy' : undefined}
      />
    );
  }
  /**
   * If we don't have an aspect ratio, we need to ensure we have width &
   * height values.
   */
  if (!width || !height) {
    /**
     * If you see this error:
     *
     * - Did you remember to include these fields in your GROQ or GraphQL
     *   query?
     * - Alternatively, provide an aspectRatio property - when that value
     *   exists, width & height are not needed.
     */
    throw new Error('No width or height was provided.');
  }

  return (
    <img
      className={className}
      src={src}
      sizes={sizesString}
      srcSet={srcSet}
      alt={nextImageProps.alt || ''}
      width={width}
      height={height}
      loading={!priority ? 'lazy' : undefined}
    />
  );
};

export const GenericImage: FC<GenericImageProps> = ({ caption, ...props }) => {
  /* If the provided image has a caption, wrap it in a <figure> tag. */
  if (caption) {
    return (
      <figure className="GenericImage">
        <GenericImageInner {...props} />
        <figcaption className="left-0 pt-4 font-size-10 text-color-secondary">
          {caption}
        </figcaption>
      </figure>
    );
  }
  /* Otherwise, do not wrap in <figure>. This allows us to use this component
   * for decorative images which should not be wrapped in figure tags for a11y reasons */
  return <GenericImageInner {...props} />;
};
