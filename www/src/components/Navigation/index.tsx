import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import * as SanityTypes from '@/types/sanity';
import { useMatchMedia, useUIProvider } from '@/hooks';
import { NavLink } from './navLink';
import { NavWrapper, NavContainer, NavLinksWrapper } from './styles';

// TODO: replace next/link and next/image with Link and Image compoents
// after they get created.

type Props = {
  logoColor: SanityTypes.Image;
  logoMonochrome: SanityTypes.Image;
  navLinks: SanityTypes.NavLinkObject[];
};

export const Navigation: FC<Props> = ({
  logoColor,
  logoMonochrome,
  navLinks,
}) => {
  const {
    globalNavOpen,
    setGlobalNavOpen,
    setGlobalNavDropdownOpen,
    toggleGlobalNav,
  } = useUIProvider();
  const isMobile = useMatchMedia('(max-width:800px)');
  const logo =
    isMobile && globalNavOpen
      ? logoMonochrome?.asset?.url
      : logoColor?.asset?.url;
  const router = useRouter();

  // close globalNav and globalNavDropdown outside of mobile breakpoint
  useEffect(() => {
    if (!isMobile) {
      setGlobalNavOpen(false);
      setGlobalNavDropdownOpen(false);
    }
  }, [isMobile, setGlobalNavOpen, setGlobalNavDropdownOpen]);

  // close globalNav and globalNavDropdown on route change
  useEffect(() => {
    if (globalNavOpen) {
      setGlobalNavOpen(false);
      setGlobalNavDropdownOpen(false);
    }
  }, [router.asPath, setGlobalNavDropdownOpen]);
  return (
    <nav
      className={cn(
        NavWrapper,
        isMobile && globalNavOpen ? 'bg-yellow' : 'bg-transparent',
      )}
    >
      <div className={cn(NavContainer)}>
        {logo && (
          <Link href="/">
            <Image src={logo} width={120} height={22} alt="logo" />
          </Link>
        )}

        {!isMobile && (
          <div className={cn(NavLinksWrapper)}>
            {navLinks.map((navItem) => (
              <NavLink key={navItem._key} navItem={navItem} />
            ))}
          </div>
        )}

        {/* menu button only visible on tablet and mobile */}
        <button className="md:hidden" onClick={toggleGlobalNav}>
          {!globalNavOpen && (
            <SimpleIcon type="menu" width={24} color="#131D2B" />
          )}
          {globalNavOpen && (
            <SimpleIcon type="close" width={24} color="white" />
          )}
        </button>
      </div>

      {/* mobile menu */}
      {isMobile && globalNavOpen && (
        <div className={cn(NavLinksWrapper)}>
          {navLinks.map((navItem) => (
            <NavLink key={navItem._key} navItem={navItem} />
          ))}
        </div>
      )}
    </nav>
  );
};
