import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';

type Props = {
  dividerBlock: SanityTypes.DividerBlock;
};

export const DividerBlock: FC<Props> = ({ dividerBlock }) => {
  const { borderBottom, borderTop } = dividerBlock;

  return (
    <div
      className={cn(
        'h-24 border-grey-medium container-padding-bleed border-1',
        {
          'border-b': !!borderBottom,
        },
      )}
    />
  );
};
