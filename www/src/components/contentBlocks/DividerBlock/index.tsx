import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';

type Props = {
  dividerBlock: SanityTypes.DividerBlock;
};

export const DividerBlock: FC<Props> = ({ dividerBlock }) => {
  const { borderBottom } = dividerBlock;

  return (
    <div
      className={cn(
        'h-12 border-grey-medium border-1 container-padding-bleed--margin-only',
        {
          'border-b': !!borderBottom,
        },
      )}
    />
  );
};
