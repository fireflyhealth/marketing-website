import { FC } from 'react';
import cn from 'classnames';
import { SubnavItem } from '@/types/sanity';
import { Wrapper } from './styles';

const SubnavItem: FC<{ item: SubnavItem }> = ({ item }) => {
  const { label, contentBlockId } = item;
  return (
    <div className={cn('flex', 'justify-center')}>
      <a href={`#${contentBlockId}`}>{label}</a>
    </div>
  );
};

export const Subnav: FC<{ subnav: SubnavItem[] }> = ({ subnav }) => {
  if (subnav.length <= 0) {
    return null;
  }

  return (
    <div className={cn(Wrapper)}>
      {subnav.map((item) => (
        <SubnavItem key={item._type} item={item} />
      ))}
    </div>
  );
};
