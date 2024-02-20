import { FC } from 'react';
import cn from 'classnames';
import { CardListBlock as CardListBlockType } from '@/types/sanity';
import { ContentBlockHeader } from '../ContentBlockWrapper';
import { Card } from './Card';
import { Wrapper, CardListWrapper } from './styles';

type Props = {
  cardListBlock: CardListBlockType;
};

export const CardListBlock: FC<Props> = ({ cardListBlock }) => {
  const { header, cardList } = cardListBlock;

  return (
    <div className={cn(Wrapper)}>
      {header && <ContentBlockHeader header={header} />}
      <div className={cn(CardListWrapper)}>
        {cardList.map((card) => (
          <Card key={card._key} card={card} />
        ))}
      </div>
    </div>
  );
};
