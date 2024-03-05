import React, { FC } from 'react';
import {
  BigNumber as BigNumberType,
  BigNumbers as BigNumbersType,
} from '@/types/sanity';
import { RichText } from '../RichText';
import cn from 'classnames';

type BigNumberProps = {
  bigNumber: BigNumberType;
};

export const BigNumber: FC<BigNumberProps> = ({ bigNumber }) => {
  const { value, unit, description } = bigNumber;
  const formattedValue = value.toLocaleString('en-US');
  return (
    <div className="py-6">
      <div className="font-trust">
        {unit && unit.position === 'before' ? (
          <span className="font-size-6 align-top mr-[0.2em]">
            {unit.unitValue}
          </span>
        ) : null}
        <span className="font-size-1">{formattedValue}</span>
        {unit && unit.position === 'after' ? (
          <span className="font-size-6 align-top ml-[0.2em]">
            {unit.unitValue}
          </span>
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
  const bigNumberItems = bigNumbers.bigNumbers;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
        {bigNumberItems.map((bigNumber) => (
          <BigNumber key={bigNumber._key} bigNumber={bigNumber} />
        ))}
      </div>
      {bigNumbers.citation ? (
        <div
          className={cn({
            'pt-14 md:pt-12': bigNumberItems.length > 1,
          })}
        >
          <RichText content={bigNumbers.citation} fontSize="font-size-10" />
        </div>
      ) : null}
    </div>
  );
};
