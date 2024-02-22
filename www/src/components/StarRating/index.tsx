import { FC } from 'react';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';

type Props = {
  starRating: number;
};

export const StarRating: FC<Props> = ({ starRating }) => {
  return (
    <div>
      <div className="flex flex-row space-x-1">
        <SimpleIcon
          type="star"
          wrapperStyles={cn(
            starRating >= 1 ? 'text-black' : 'text-grey-dark',
            'w-3',
          )}
        />
        <SimpleIcon
          type="star"
          wrapperStyles={cn(
            starRating >= 2 ? 'text-black' : 'text-grey-dark',
            'w-3',
          )}
        />
        <SimpleIcon
          type="star"
          wrapperStyles={cn(
            starRating >= 3 ? 'text-black' : 'text-grey-dark',
            'w-3',
          )}
        />
        <SimpleIcon
          type="star"
          wrapperStyles={cn(
            starRating >= 4 ? 'text-black' : 'text-grey-dark',
            'w-3',
          )}
        />
        <SimpleIcon
          type="star"
          wrapperStyles={cn(
            starRating >= 5 ? 'text-black' : 'text-grey-dark',
            'w-3',
          )}
        />
      </div>
    </div>
  );
};
