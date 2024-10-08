import React, { FC } from 'react';
import cn from 'classnames';
import { RichTextChildBlock as RichTextChildBlockType } from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { BrandedIcon } from '@/svgs/BrandedIcon';

type RichTextChildBlockProps = {
  richTextChildBlock: RichTextChildBlockType;
  imagePriority?: boolean;
};

export const RichTextChildBlock: FC<RichTextChildBlockProps> = ({
  richTextChildBlock,
  imagePriority,
}) => {
  const { body, alignCenter, icon, heading, headingFontSize, image } =
    richTextChildBlock;
  return (
    <div
      className={cn('ChildBlockWrapper', {
        'flex flex-col items-center text-center': alignCenter,
      })}
    >
      {icon ? (
        <BrandedIcon type={icon.icon} iconStyles="!w-12 !h-12 mb-5 md:mb-6" />
      ) : null}
      {image ? (
        <div className="pb-5 md:pb-6">
          <SanityImage
            width={120}
            image={image}
            sizes={['120px']}
            priority={imagePriority}
          />
        </div>
      ) : null}
      {heading ? (
        <h3 className={cn('font-trust pb-5 md:pb-6', `${headingFontSize}`)}>
          {heading}
        </h3>
      ) : null}
      {body && (
        <RichText
          className={cn('w-full text-wrap')}
          content={body}
          alignCenter={!!alignCenter}
        />
      )}
    </div>
  );
};
