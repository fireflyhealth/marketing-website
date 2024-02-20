import { FC } from 'react';
import { CardListBlock as CardListBlockType } from '@/types/sanity';
import { ContentBlockHeader } from '../ContentBlockWrapper';
import { Card } from './Card';

type Props = {
  cardListBlock: CardListBlockType;
};

export const CardListBlock: FC<Props> = ({ cardListBlock }) => {
  const { header, cardList } = cardListBlock;

  return (
    <div>
      {header && <ContentBlockHeader header={header} />}
      <div>
        {cardList.map((card) => (
          <Card key={card._key} card={card} />
        ))}
      </div>
    </div>
  );
};
