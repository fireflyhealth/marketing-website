import { FC } from 'react';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Copy, Title, BellyButtonText, Description } from './styles';

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
    <div className={cn(Copy)}>
      {headerCopy ? (
        <h2 className={cn(Title, 'font-size-4')}>{title}</h2>
      ) : (
        <h3 className={cn(Title, 'font-size-6')}>{title}</h3>
      )}
      {bellyButtonText && (
        <span
          className={cn(
            BellyButtonText,
            isHighlighted ? 'theme-text-color-decorative' : 'text-yellow',
          )}
        >
          {bellyButtonText}
        </span>
      )}
      <p className={cn(Description)}>{description}</p>
    </div>
  );
};
