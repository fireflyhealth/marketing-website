import { FC } from 'react';
import cn from 'classnames';
import { Footnotes as FootnotesType } from '@/types/sanity';
import { Wrapper, Title, OrderedList, ListItem } from './styles';

type Props = {
  footnotes: FootnotesType;
};

export const Footnotes: FC<Props> = ({ footnotes }) => {
  return (
    <div className={cn(Wrapper)}>
      <div className={cn(Title)}>References</div>
      <ol className={cn(OrderedList)}>
        {footnotes.footnotes.map((footnote, index) => (
          <li key={index} className={cn(ListItem)}>
            {footnote}
          </li>
        ))}
      </ol>
    </div>
  );
};
