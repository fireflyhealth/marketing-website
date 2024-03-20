import { FC, RefObject, useRef } from 'react';
import cn from 'classnames';
import { Maybe, SubnavItem as SubnavItemType } from '@/types/sanity';

import { useUIProvider } from '@/context/UIProvider';
import { useHash } from '@/hooks/useHash';
import { useRect } from '@/hooks/useRect';

import {
  Wrapper,
  MobileWrapper,
  SubnavItemWrapper,
  SubnavItemCircle,
  InnerWrapper,
  MobileInnerWrapper,
} from './styles';

const SubnavItem: FC<{
  item: SubnavItemType;
  hash: Maybe<string>;
  isOnTop?: boolean;
}> = ({ item, hash, isOnTop }) => {
  const { label, contentBlockId, ariaLabel } = item;
  const { currentContentBlock } = useUIProvider();

  const navItemRef = useRef<HTMLAnchorElement>(null);

  // check if currentContentBlock (global state) matches the contentBlockId passed into the component
  const isCurrentContentBlock = currentContentBlock === contentBlockId;
  // check if hash matches the contentBlockId passed into the component
  const isCurrentHash = hash === contentBlockId;
  const isCurrentContentBlockWithHash = isCurrentHash && isCurrentContentBlock;
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
          // first check if hash AND currentContentBlock matche contentBlockId
          // then just check if the currentContentBlock matches contentBlockId
          isCurrentContentBlockWithHash
            ? 'Subnav__item-circle--active'
            : isCurrentContentBlock
              ? 'Subnav__item-circle--active'
              : '',
          {
            'Subnav__item-circle--active-top': !isOnTop,
          },
        )}
      />
      {label}
    </a>
  );
};

export const SubnavContainer: FC<{
  id: string;
  subnav: SubnavItemType[];
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

export const Subnav: FC<{ subnav?: Maybe<SubnavItemType[]> }> = ({
  subnav,
}) => {
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
