import { FC } from 'react';
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
        icon={<SimpleIcon type="star" wrapperStyles="w-3 text-black" />}
        emptyIcon={
          <SimpleIcon type="star" wrapperStyles="w-3 text-grey-dark" />
        }
        readOnly
      />
    </div>
  );
};
