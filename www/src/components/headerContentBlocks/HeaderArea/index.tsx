import React, { FC } from 'react';
import { HeaderBlock as HeaderBlockType } from '@/types/sanity';

import { VideoHeader } from '../VideoHeader';

type HeaderBlockProps = {
  block: HeaderBlockType;
};

const HeaderBlock: FC<HeaderBlockProps> = ({ block }) => {
  switch (block._type) {
    case 'videoHeader':
      return <VideoHeader videoHeader={block} />;
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

export const HeaderArea: FC<HeaderAreaProps> = ({ block }) => (
  <HeaderBlock block={block} />
);
