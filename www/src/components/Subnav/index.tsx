import { FC, useRef } from 'react';
import cn from 'classnames';
import { Maybe, SubnavItem as SubnavItemType } from '@/types/sanity';

import { useUIProvider } from '@/context/UIProvider';

import {
  Wrapper,
  SubnavItemWrapper,
  SubnavItemCircle,
  InnerWrapper,
} from './styles';

const SubnavItem: FC<{
  item: SubnavItemType;
}> = ({ item }) => {
  const { label, contentBlockId, ariaLabel } = item;
  const { currentContentBlock } = useUIProvider();

  const navItemRef = useRef<HTMLAnchorElement>(null);

  // check if currentContentBlock (global state) matches the contentBlockId passed into the component
  const isCurrentContentBlock = currentContentBlock === contentBlockId;
  return (
    <a
      ref={navItemRef}
      href={`#${contentBlockId}`}
      className={cn(SubnavItemWrapper)}
      aria-label={ariaLabel || undefined}
      style={{ whiteSpace: 'nowrap' }}
    >
      <div
        className={cn(
          SubnavItemCircle,
          currentContentBlock == null
            ? 'bg-grey-medium'
            : isCurrentContentBlock
              ? 'bg-yellow'
              : 'bg-grey-medium',
        )}
      />
      {label}
    </a>
  );
};

export const Subnav: FC<{ subnav?: Maybe<SubnavItemType[]> }> = ({
  subnav,
}) => {
  if (!subnav || subnav.length === 0) {
    return null;
  }

  return (
    <div className={cn(Wrapper)} id="subnav">
      <div className={cn(InnerWrapper)}>
        {subnav?.map((item) => (
          <SubnavItem key={item.contentBlockId} item={item} />
        ))}
      </div>
    </div>
  );
};
