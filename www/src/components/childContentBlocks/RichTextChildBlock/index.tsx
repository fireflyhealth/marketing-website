import React, { FC } from 'react';
import cn from 'classnames';
import { RichTextChildBlock as RichTextChildBlockType } from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { BrandedIcon } from '@/svgs/BrandedIcon';

type RichTextChildBlockProps = {
  richTextChildBlock: RichTextChildBlockType;
};

export const RichTextChildBlock: FC<RichTextChildBlockProps> = ({
  richTextChildBlock,
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
        <BrandedIcon type={icon.icon} wrapperStyles="w-12 pb-5 md:pb-6" />
      ) : null}
      {image ? (
        <div className="pb-5 md:pb-6">
          <SanityImage width={120} image={image} sizes={['120px']} />
        </div>
      ) : null}
      {heading ? (
        <h3 className={cn('font-trust pb-6', `${headingFontSize}`)}>
          {heading}
        </h3>
      ) : null}
      {body && <RichText content={body} alignCenter={!!alignCenter} />}
    </div>
  );
};
