import React, { FC } from 'react';
import cn from 'classnames';
import { BigNumbers as BigNumbersType } from '@/types/sanity';
import { BigNumbers } from '@/components/BigNumber';
import { Wrapper } from './styles';

type BigNumbersChildBlockProps = {
  bigNumbers: BigNumbersType;
};

export const BigNumbersChildBlock: FC<BigNumbersChildBlockProps> = ({
  bigNumbers,
}) => (
  <div className={cn(Wrapper)}>
    <BigNumbers bigNumbers={bigNumbers} />
  </div>
);
