import { FC } from 'react';
import cn from 'classnames';
import StyledRating from '@mui/material/Rating';
import { SimpleIcon } from '@/svgs/SimpleIcon';

type Props = {
  starRating: number;
};

export const StarRating: FC<Props> = ({ starRating }) => {
  return (
    <div>
      <StyledRating
        name="customized-color"
        defaultValue={starRating}
        icon={<SimpleIcon type="star" wrapperStyles="w-3" />}
        emptyIcon={
          <SimpleIcon type="star" wrapperStyles="w-3 text-grey-darker" />
        }
        readOnly
      />
    </div>
  );
};
