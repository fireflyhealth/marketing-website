import { FC, RefObject, useEffect, useRef } from 'react';
import cn from 'classnames';
import { Maybe, SubnavItem } from '@/types/sanity';

import { useHash } from '@/lib/hooks/useHash';
import { useRect } from '@/lib/hooks/useRect';

import {
  Wrapper,
  MobileWrapper,
  SubnavItemWrapper,
  SubnavItemCircle,
  InnerWrapper,
  MobileInnerWrapper,
} from './styles';

const SubnavItem: FC<{
  item: SubnavItem;
  hash: Maybe<string>;
  isOnTop?: boolean;
}> = ({ item, hash, isOnTop }) => {
  const { label, contentBlockId, ariaLabel } = item;
  const isActive = hash === contentBlockId;
  const navItemRef = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={navItemRef}
      href={`#${contentBlockId}`}
      className={cn(SubnavItemWrapper)}
      aria-label={ariaLabel || undefined}
    >
      <div
        className={cn(SubnavItemCircle, {
          'Subnav__item-circle--active': isActive,
          'Subnav__item-circle--active-top': !isOnTop,
        })}
      />
      {label}
    </a>
  );
};

export const SubnavContainer: FC<{
  id: string;
  subnav: SubnavItem[];
  subnavRef?: RefObject<HTMLDivElement>;
  wrapperClassName: string;
  innerWrapperClassName: string;
  hash: Maybe<string>;
  top?: number;
}> = ({
  id,
  subnav,
  subnavRef,
  hash,
  top,
  wrapperClassName,
  innerWrapperClassName,
}) => {
  return (
    <div ref={subnavRef} className={cn(wrapperClassName)}>
      <div className={cn(innerWrapperClassName)}>
        {subnav?.map((item) => (
          <SubnavItem
            key={`${id}-${item.contentBlockId}`}
            item={item}
            hash={hash}
            isOnTop={Number.isInteger(top) && top === 0}
          />
        ))}
      </div>
    </div>
  );
};

export const Subnav: FC<{ subnav?: Maybe<SubnavItem[]> }> = ({ subnav }) => {
  const [subnavRect, subnavRef] = useRect();
  const hash = useHash();
  const { bottom, top } = subnavRect || {};

  if (!subnav || subnav.length === 0) {
    return null;
  }

  return (
    <>
      <SubnavContainer
        id="subnav-1"
        subnav={subnav}
        subnavRef={subnavRef}
        hash={hash}
        top={top}
        wrapperClassName={cn(Wrapper)}
        innerWrapperClassName={cn(InnerWrapper)}
      />
      <SubnavContainer
        id="subnav-2"
        subnav={subnav}
        hash={hash}
        wrapperClassName={cn(MobileWrapper, {
          'Subnav__mobile--avtice': bottom && bottom < 0,
        })}
        innerWrapperClassName={cn(MobileInnerWrapper)}
      />
    </>
  );
};
