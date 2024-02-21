import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';

type Props = {
  copy: SanityTypes.SequenceBlockTextFields;
  headerCopy?: boolean;
  isHighlighted?: boolean;
};

export const SequenceCopy: FC<Props> = ({
  copy,
  headerCopy,
  isHighlighted,
}) => {
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
      {bellyButtonText && (
        <span
          className={cn(
            'font-size-10 font-roobert w-fit',
            isHighlighted ? 'theme-text-color-decorative' : 'text-yellow',
          )}
        >
          {bellyButtonText}
        </span>
      )}
      <p className="font-size-8 font-roobert theme-text-color-secondary">
        {description}
      </p>
    </div>
  );
};
