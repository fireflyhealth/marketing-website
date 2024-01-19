import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SimpleIcon } from '@/svgs/SimpleIcon';
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
import * as SanityTypes from '@/types/sanity';
import cn from 'classnames';

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
  const logo = navOpen ? logoMonochrome.asset.url : logoColor.asset.url;
  return (
    <nav className={cn(NavWrapper, navOpen ? 'bg-yellow' : 'bg-white')}>
      <div className={cn(NavContainer)}>
        <Link href="/">
          <Image src={logo} width={120} height={22} alt="logo" />
        </Link>
        <button className="md:hidden" onClick={() => setNavOpen(true)}>
          {!navOpen && <SimpleIcon type="menu" width={24} color="#131D2B" />}
          {navOpen && <SimpleIcon type="close" width={24} color="white" />}
        </button>
      </div>
      {navOpen && (
        <div className={cn(NavLinksWrapper)}>
          <>
            {navLinks.map((navItem) => (
              <>
                {navItem.showDropdown === true ? (
                  <div className={cn(NavLinkDropdownWrapper)}>
                    <button className={cn(NavDropdownButton)}>
                      <p className={cn(NavLink)}>{navItem.page.title}</p>
                      <SimpleIcon
                        type="arrow-down"
                        width={12}
                        color="#131D2B"
                      />
                    </button>
                    <div className={cn(NavLinkDropdown)}>
                      {navItem.page.subPages.map((subPage) => (
                        <Link href={subPage.slug} className={cn(SubPageLink)}>
                          {subPage.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={navItem.page.slug} className={cn(NavLink)}>
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
