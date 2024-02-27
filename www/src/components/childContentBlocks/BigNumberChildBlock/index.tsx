import React, { FC } from 'react';
import cn from 'classnames';
import { BigNumber as BigNumberType } from '@/types/sanity';
import { BigNumber } from '@/components/BigNumber';

type BigNumberChildBlockProps = {
  bigNumber: BigNumberType;
};

export const BigNumberChildBlock: FC<BigNumberChildBlockProps> = ({
  bigNumber,
}) => (
  <div className={cn('ChildBlockWrapper')}>
    <BigNumber bigNumber={bigNumber} />
  </div>
);
