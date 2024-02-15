import { FC } from 'react';
import { TwoColumnUnorderedList as TwoColumnUnorderedListType } from '@/types/sanity';

type Props = {
  twoColumnUnorderedList: TwoColumnUnorderedListType;
};

export const TwoColumnUnorderedList: FC<Props> = ({
  twoColumnUnorderedList,
}) => {
  return (
    <ul className="TwoColumnUnorderedList grid grid-rows-1 md:grid-cols-2 md:gap-x-[30px]">
      {twoColumnUnorderedList.listItems.map((item, index) => {
        return (
          <li
            key={index}
            className="font-size-8 border-t border-grey-dark py-5"
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};
