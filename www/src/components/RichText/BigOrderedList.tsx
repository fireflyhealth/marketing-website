import { FC } from 'react';
import cn from 'classnames';
import { BigOrderedList as BigOrderedListType } from '@/types/sanity';
import { RichText } from '@/components/RichText';

type Props = {
  bigOrderedList: BigOrderedListType;
};

export const BigOrderedList: FC<Props> = ({ bigOrderedList }) => {
  return (
    <ol className="BigOrderedList flex flex-col">
      {bigOrderedList.listItems.map((item, index) => {
        return (
          <li
            key={index}
            className="font-size-8 border-t theme-border-color py-6 flex flex-row w-full"
          >
            <p className={cn('font-size-6 font-trust mr-5')}>{index + 1}.</p>
            <div>
              <p className={cn('font-size-6 font-trust')}>{item.title}</p>
              {item.description && (
                <div className={cn('font-size-8 font-roobert mt-2.5')}>
                  <RichText content={item.description} />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};
