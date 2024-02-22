import React, { FC } from 'react';
import cn from 'classnames';
import { RichTextChildBlock as RichTextChildBlockType } from '@/types/sanity';
import { RichText } from '@/components/RichText';
import { Wrapper } from './styles';

type RichTextChildBlockProps = {
  richTextChildBlock: RichTextChildBlockType;
};

export const RichTextChildBlock: FC<RichTextChildBlockProps> = ({
  richTextChildBlock,
}) => {
  const { heading, body } = richTextChildBlock;
  return (
    <div className={cn('ChildBlockWrapper', Wrapper)}>
      <h3 className="font-size-6 font-trust pb-6">{heading}</h3>
      <RichText content={body} />
    </div>
  );
};
