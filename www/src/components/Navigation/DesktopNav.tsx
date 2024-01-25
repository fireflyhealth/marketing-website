import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { Image as ImageType, KeyedArray, NavGroupType } from '@/types/sanity';
import { NavLink } from './NavLink';
import { NavWrapper, NavContainer, NavLinksWrapper } from './styles';

type Props = {
  logoColor: ImageType;
  navGroup: KeyedArray<NavGroupType>;
};

export const DesktopNav: FC<Props> = ({ logoColor, navGroup }) => {
  const logo = logoColor?.asset?.url;
  return (
    <nav
      className={cn(NavWrapper, 'bg-transparent hidden md:absolute md:block')}
    >
      <div className={cn(NavContainer)}>
        {logo && (
          <Link href="/">
            <Image src={logo} width={120} height={22} alt="logo" />
          </Link>
        )}

        <div className={cn(NavLinksWrapper)}>
          {navGroup.map((navItem) => (
            <NavLink key={navItem._key} navItem={navItem} />
          ))}
        </div>
      </div>
    </nav>
  );
};
