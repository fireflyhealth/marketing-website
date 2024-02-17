import React, { FC } from 'react';
import { RichTextChildBlock as RichTextChildBlockType } from '@/types/sanity';
import { RichText } from '@/components/RichText';

type RichTextChildBlockProps = {
  richTextChildBlock: RichTextChildBlockType;
};

export const RichTextChildBlock: FC<RichTextChildBlockProps> = ({
  richTextChildBlock,
}) => {
  const { heading, body } = richTextChildBlock;
  return (
    <div>
      <h3 className="font-size-6 font-trust pb-6">{heading}</h3>
      <RichText content={body} />
    </div>
  );
};
