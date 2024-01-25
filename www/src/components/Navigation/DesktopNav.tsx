import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { LogotypeColor } from '@/svgs/Logotype';
import * as SanityTypes from '@/types/sanity';
import { NavLink } from './NavLink';
import { NavWrapper, NavContainer, NavLinksWrapper } from './styles';

// TODO: replace next/link and next/image with Link and Image compoents
// after they get created.

type Props = {
  navGroup: SanityTypes.NavGroupType[];
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
            <NavLink key={navItem._key} navItem={navItem} />
          ))}
        </div>
      </div>
    </nav>
  );
};
