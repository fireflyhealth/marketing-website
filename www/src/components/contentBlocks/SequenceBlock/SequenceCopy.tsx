import { FC } from 'react';
import * as SanityTypes from '@/types/sanity';

type Props = {
  copy: SanityTypes.SequenceBlockTextFields;
  headerCopy?: boolean;
};

export const SequenceCopy: FC<Props> = ({ copy, headerCopy }) => {
  const { title, bellyButtonText, description } = copy;

  return (
    <div className="flex flex-col space-y-2 text-center items-center">
      {headerCopy ? (
        <h2 className="font-size-4 font-trust theme-text-color-primary">
          {title}
        </h2>
      ) : (
        <h3 className="font-size-6 font-trust theme-text-color-primary">
          {title}
        </h3>
      )}
      <span className="font-size-10 font-roobert text-yellow w-fit">
        {bellyButtonText}
      </span>
      <p className="font-size-8 font-roobert theme-text-color-secondary">
        {description}
      </p>
    </div>
  );
};
