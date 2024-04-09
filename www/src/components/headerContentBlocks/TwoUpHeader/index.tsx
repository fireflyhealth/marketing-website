import React, { FC } from 'react';
import cn from 'classnames';
import { TwoUpHeader as TwoUpHeaderType } from '@/types/sanity';
import { TwoUpObject } from '@/components/contentBlocks/TwoUpBlock';

type TwoUpHeaderProps = {
  twoUpHeader: TwoUpHeaderType;
};

export const TwoUpHeader: FC<TwoUpHeaderProps> = ({ twoUpHeader }) => {
  return (
    <div>
      <TwoUpObject
        imagePriority
        twoUpObject={{
          ...twoUpHeader,
          normalLayoutTheme: null,
          _type: 'twoUpObject',
        }}
      />
    </div>
  );
};
