import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import * as SanityTypes from '@/types/sanity';
import { useMatchMedia } from '@/hooks';
import { NavLink } from './navLink';
import { NavWrapper, NavContainer, NavLinksWrapper } from './styles';

// TODO: replace next/link and next/image with Link and Image compoents
// after they get created.

type Props = {
  logoColor: any;
  logoMonochrome: any;
  navLinks: SanityTypes.NavLinkObject[];
};

export const Navigation: FC<Props> = ({
  logoColor,
  logoMonochrome,
  navLinks,
}) => {
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNav = () => {
    if (navOpen) {
      setNavOpen(false);
    } else setNavOpen(true);
  };

  const toggleDropdown = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    } else setDropdownOpen(true);
  };

  const isMobile = useMatchMedia('(max-width:800px)');
  const logo =
    isMobile && navOpen ? logoMonochrome.asset.url : logoColor.asset.url;
  return (
    <nav
      className={cn(
        NavWrapper,
        isMobile && navOpen ? 'bg-yellow' : 'bg-transparent',
      )}
    >
      <div className={cn(NavContainer)}>
        <Link href="/" onClick={toggleNav}>
          <Image src={logo} width={120} height={22} alt="logo" />
        </Link>

        {!isMobile && (
          <div className={cn(NavLinksWrapper)}>
            {navLinks.map((navItem) => (
              <NavLink
                key={navItem._key}
                navItem={navItem}
                toggleNav={toggleNav}
                toggleDropdown={toggleDropdown}
                dropdownOpen={dropdownOpen}
              />
            ))}
          </div>
        )}

        {/* menu button only visible on tablet and mobile */}
        <button className="md:hidden" onClick={toggleNav}>
          {!navOpen && <SimpleIcon type="menu" width={24} color="#131D2B" />}
          {navOpen && <SimpleIcon type="close" width={24} color="white" />}
        </button>
      </div>

      {/* mobile menu */}
      {isMobile && navOpen && (
        <div className={cn(NavLinksWrapper)}>
          {navLinks.map((navItem) => (
            <NavLink
              key={navItem._key}
              navItem={navItem}
              toggleNav={toggleNav}
              toggleDropdown={toggleDropdown}
              dropdownOpen={dropdownOpen}
            />
          ))}
        </div>
      )}
    </nav>
  );
};
