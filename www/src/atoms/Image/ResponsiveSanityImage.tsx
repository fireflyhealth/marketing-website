import React, { FC } from 'react';
import cn from 'classnames';
import { ResponsiveImageSet } from '@/types/sanity';
import { SanityImage, SanityImageProps } from './SanityImage';

type ResponsiveSanityImageProps = Pick<SanityImageProps, 'sizes'> & {
  imageSet: ResponsiveImageSet;
  className?: string;
};

export const ResponsiveSanityImage: FC<ResponsiveSanityImageProps> = ({
  imageSet,
  sizes,
  className,
}) => {
  const { desktop, tablet, mobile } = imageSet;

  return (
    <>
      {mobile ? (
        <SanityImage
          sizes={sizes}
          className={cn(
            className,
            /* If there is tablet & desktop,
             * OR if there is tablet but no desktop, display only at small */
            (tablet && desktop) || (tablet && !desktop)
              ? 'md:hidden'
              : /* If there is no tablet but yes desktop, display from small to medium */
                !tablet && desktop
                ? 'lg:hidden'
                : /* (otherwise) if there is no tablet and no desktop, display at all sizes */
                  'block',
          )}
          fill
          image={mobile}
        />
      ) : null}
      {tablet ? (
        <SanityImage
          sizes={sizes}
          className={cn(
            className,
            /* If there is mobile & desktop, display only at medium */
            mobile && desktop
              ? 'hidden md:block lg:hidden'
              : /* If there is no mobile but yes desktop, display from small to medium */
                !mobile && desktop
                ? 'block lg:hidden'
                : /* If there is mobile but no desktop, display from medium up */
                  mobile && !desktop
                  ? 'none md:block'
                  : /* (Otherwise) If there is no mobile and no desktop, display only at medium */
                    'block',
          )}
          fill
          image={tablet}
        />
      ) : null}
      {desktop ? (
        <SanityImage
          sizes={sizes}
          fill
          className={cn(
            className,
            /* If there are tablet and mobile images,
             * OR if there is no mobile, yes tablet, display at large */
            (tablet && mobile) || (tablet && !mobile)
              ? 'hidden lg:block'
              : /* If there is mobile but no tablet, display at medium */
                !tablet && mobile
                ? 'hidden md:block'
                : /* (otherwise) there is no mobile nor tablet, display at all sizes */
                  'block',
          )}
          image={desktop}
        />
      ) : null}
    </>
  );
};
