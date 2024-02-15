import { FC } from 'react';
import { QuoteObject as QuoteObjectType } from '@/types/sanity';

type Props = {
  quoteObject: QuoteObjectType;
};

export const QuoteObject: FC<Props> = ({ quoteObject }) => {
  const { quote, attribution } = quoteObject;
  return (
    <div>
      <div>{quote}</div>
      <div>{attribution.name}</div>
    </div>
  );
};
