import React, { FC } from 'react';
import { RichTextChildBlock as RichTextChildBlockType } from '@/types/sanity';
import { RichText } from '@/components/RichText';
import cn from 'classnames';

type RichTextChildBlockProps = {
  richTextChildBlock: RichTextChildBlockType;
};

export const RichTextChildBlock: FC<RichTextChildBlockProps> = ({
  richTextChildBlock,
}) => {
  const { body, alignCenter } = richTextChildBlock;
  return (
    <div className="ChildBlockWrapper">
      <RichText content={body} alignCenter={!!alignCenter} />
    </div>
  );
};
