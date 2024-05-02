import React, { FC } from 'react';
import cn from 'classnames';
import {
  BigNumber as BigNumberType,
  BigNumbers as BigNumbersType,
} from '@/types/sanity';
import { RichText } from '../RichText';

type BigNumberProps = {
  bigNumber: BigNumberType;
};

export const BigNumber: FC<BigNumberProps> = ({ bigNumber }) => {
  const { value, valueRange, valueTwo, unit, description } = bigNumber;
  const formattedValue = (value: number) => value.toLocaleString('en-US');
  return (
    <div className="BigNumber">
      <div className="font-trust">
        {unit && unit.position === 'before' ? (
          <span className="font-size-5 align-top mr-[0.2em]">
            {unit.unitValue}
          </span>
        ) : null}
        <span className="font-size-3">{`${formattedValue(value)}`}</span>
        {valueRange && valueTwo && (
          <span className="font-size-3">{`${valueRange && valueTwo ? ` - ${formattedValue(valueTwo)}` : ''}`}</span>
        )}
        {unit && unit.position === 'after' ? (
          <span className="font-size-5 align-top ml-[0.2em]">
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
  const bigNumberLength = bigNumberItems.length;
  return (
    <div className="BigNumbers">
      <div
        className={cn(`grid grid-cols-1 gap-6`, {
          'md:grid-cols-1': bigNumberLength === 1,
          'md:grid-cols-2': bigNumberLength >= 2,
        })}
      >
        {bigNumberItems.map((bigNumber) => (
          <BigNumber key={bigNumber._key} bigNumber={bigNumber} />
        ))}
      </div>
      {bigNumbers.citation ? (
        <div
          className={cn({
            /* If there is more than one big number item, the citation spacing should be bigger. */
            'pt-14 md:pt-12': bigNumberItems.length > 1,
          })}
        >
          <RichText content={bigNumbers.citation} fontSize="font-size-10" />
        </div>
      ) : null}
    </div>
  );
};
