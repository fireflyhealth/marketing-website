import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { LogotypeColor } from '@/svgs/Logotype';
import { KeyedArray, NavGroupType } from '@/types/sanity';
import { NavGroup } from './NavGroup';
import { NavWrapper, NavContainer, NavLinksWrapper } from './styles';

type Props = {
  navGroup: KeyedArray<NavGroupType>;
};

export const DesktopNav: FC<Props> = ({ navGroup }) => {
  return (
    <nav
      className={cn(NavWrapper, 'bg-transparent hidden md:absolute md:block')}
    >
      <div className={cn(NavContainer)}>
        <Link href="/">
          <div className="w-[175px]">
            <LogotypeColor />
          </div>
        </Link>

        <div className={cn(NavLinksWrapper)}>
          {navGroup.map((navItem) => (
            <NavGroup key={navItem._key} navItem={navItem} />
          ))}
        </div>
      </div>
    </nav>
  );
};
