import React, { FC } from 'react';
import {
  BigNumber as BigNumberType,
  BigNumbers as BigNumbersType,
} from '@/types/sanity';
import { RichText } from '../RichText';

type BigNumberProps = {
  bigNumber: BigNumberType;
};

export const BigNumber: FC<BigNumberProps> = ({ bigNumber }) => {
  const { value, numberType, description } = bigNumber;
  const formattedValue = value.toLocaleString('en-US');
  return (
    <div className="py-6">
      <div className="font-trust">
        {numberType === 'dollar' ? (
          <span className="font-size-6 align-top mr-[0.2em]">$</span>
        ) : null}
        <span className="font-size-1">{formattedValue}</span>
        {numberType === 'percentage' ? (
          <span className="font-size-6 align-top ml-[0.2em]">%</span>
        ) : null}
      </div>
      <div className="max-w-[300px]">
        <RichText content={description} fontSize="font-size-8" />
      </div>
    </div>
  );
};

type BigNumbersProps = {
  bigNumbers: BigNumbersType;
};

export const BigNumbers: FC<BigNumbersProps> = ({ bigNumbers }) => {
  return (
    <div className="">
      {bigNumbers.bigNumbers.map((bigNumber) => (
        <BigNumber key={bigNumber._key} bigNumber={bigNumber} />
      ))}
    </div>
  );
};
