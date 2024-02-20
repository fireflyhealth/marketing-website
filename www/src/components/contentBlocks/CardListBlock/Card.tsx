import { FC } from 'react';
import { Card as CardType } from '@/types/sanity';

type Props = {
  card: CardType;
};

export const Card: FC<Props> = ({ card }) => {
  console.log(card);
  return <div>Card</div>;
};
