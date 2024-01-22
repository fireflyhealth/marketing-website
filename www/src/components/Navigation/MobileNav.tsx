import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import * as SanityTypes from '@/types/sanity';
import { useUIProvider } from '@/hooks';
import { NavLink } from './navLink';
import { NavWrapper, NavContainer, NavLinksWrapper } from './styles';

// TODO: replace next/link and next/image with Link and Image compoents
// after they get created.

type Props = {
  logoColor: SanityTypes.Image;
  logoMonochrome: SanityTypes.Image;
  navLinks: SanityTypes.NavLinkObject[];
};

export const MobileNav: FC<Props> = ({
  logoColor,
  logoMonochrome,
  navLinks,
}) => {
  const { globalNavOpen, toggleGlobalNav } = useUIProvider();
  const logo = globalNavOpen
    ? logoMonochrome?.asset?.url
    : logoColor?.asset?.url;
  return (
    <nav
      className={cn(
        NavWrapper,
        globalNavOpen ? 'bg-yellow' : 'bg-transparent',
        'absolute md:hidden',
      )}
    >
      <div className={cn(NavContainer)}>
        {logo && (
          <Link href="/">
            <Image src={logo} width={120} height={22} alt="logo" />
          </Link>
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

      {globalNavOpen && (
        <div className={cn(NavLinksWrapper)}>
          {navLinks.map((navItem) => (
            <NavLink key={navItem._key} navItem={navItem} isMobile />
          ))}
        </div>
      )}
    </nav>
  );
};
