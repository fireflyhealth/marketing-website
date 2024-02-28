import React, { FC } from 'react';
import { HeaderBlock as HeaderBlockType } from '@/types/sanity';

import { VideoHeader } from '../VideoHeader';
import { TextHeader } from '../TextHeader';
import { TextWithDualCtaHeader } from '../TextWithDualCtaHeader';
import { SimpleTextHeader } from '../SimpleTextHeader';

type HeaderBlockProps = {
  block: HeaderBlockType;
};

const HeaderBlock: FC<HeaderBlockProps> = ({ block }) => {
  switch (block._type) {
    case 'videoHeader':
      return <VideoHeader videoHeader={block} />;
    case 'textHeader':
      return <TextHeader textHeader={block} />;
    case 'textWithDualCtaHeader':
      return <TextWithDualCtaHeader textWithDualCtaHeader={block} />;
    case 'simpleTextHeader':
      return <SimpleTextHeader simpleTextHeader={block} />;
    default:
      console.warn(
        // @ts-expect-error
        `"${block._type.toString()} is not a valid header block type"`,
      );
  }
};

type HeaderAreaProps = {
  block: HeaderBlockType;
};

export const HeaderArea: FC<HeaderAreaProps> = ({ block }) =>
  block && <HeaderBlock block={block} />;
