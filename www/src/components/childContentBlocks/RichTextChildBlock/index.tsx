import React, { FC } from 'react';
import { RichTextChildBlock as RichTextChildBlockType } from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { BrandedIcon } from '@/svgs/BrandedIcon';

type RichTextChildBlockProps = {
  richTextChildBlock: RichTextChildBlockType;
};

export const RichTextChildBlock: FC<RichTextChildBlockProps> = ({
  richTextChildBlock,
}) => {
  const { heading, body, icon } = richTextChildBlock;
  return (
    <div className="ChildBlockWrapper">
      {icon ? (
        <BrandedIcon type={icon.icon} wrapperStyles="w-12 pb-5 md:pb-6" />
      ) : null}
      {heading ? (
        <h3 className="font-size-6 font-trust pb-6">{heading}</h3>
      ) : null}
      <RichText content={body} />
    </div>
  );
};
