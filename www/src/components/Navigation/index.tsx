import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import * as SanityTypes from '@/types/sanity';
import { useMatchMedia } from '@/hooks';
import {
  NavWrapper,
  NavContainer,
  NavLinksWrapper,
  NavLink,
  NavLinkDropdownWrapper,
  NavDropdownButton,
  NavLinkDropdown,
  SubPageLink,
} from './styles';

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

  const logo = navOpen ? logoMonochrome.asset.url : logoColor.asset.url;
  const isMobile = useMatchMedia('(max-width:800px)');
  return (
    <nav className={cn(NavWrapper, navOpen ? 'bg-yellow' : 'bg-white')}>
      <div className={cn(NavContainer)}>
        <Link href="/" onClick={toggleNav}>
          <Image src={logo} width={120} height={22} alt="logo" />
        </Link>

        {/* menu button only visible on tablet and mobile */}
        <button className="md:hidden" onClick={toggleNav}>
          {!navOpen && <SimpleIcon type="menu" width={24} color="#131D2B" />}
          {navOpen && <SimpleIcon type="close" width={24} color="white" />}
        </button>
      </div>

      {/* mobile menu */}
      {isMobile && navOpen && (
        <div className={cn(NavLinksWrapper)}>
          <>
            {navLinks.map((navItem) => (
              <>
                {navItem.page.subPages ? (
                  <div className={cn(NavLinkDropdownWrapper)}>
                    <button
                      className={cn(NavDropdownButton)}
                      onClick={toggleDropdown}
                    >
                      <p className={cn(NavLink)}>{navItem.page.title}</p>
                      <SimpleIcon
                        type="arrow-down"
                        width={12}
                        color="#131D2B"
                        className={cn(dropdownOpen ? 'rotate-180' : '')}
                      />
                    </button>
                    {dropdownOpen && (
                      <div className={cn(NavLinkDropdown)}>
                        {navItem.page.subPages.map((subPage) => (
                          <Link
                            key={subPage._id}
                            href={subPage.slug}
                            className={cn(SubPageLink)}
                            onClick={toggleNav}
                          >
                            {subPage.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={navItem.page.slug}
                    className={cn(NavLink)}
                    onClick={toggleNav}
                  >
                    {navItem.page.title}
                  </Link>
                )}
              </>
            ))}
          </>
        </div>
      )}
    </nav>
  );
};
