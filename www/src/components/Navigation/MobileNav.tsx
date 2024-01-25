import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { useUIProvider } from '@/context/UIProvider';
import { Image as ImageType, KeyedArray, NavGroupType } from '@/types/sanity';
import { NavLink } from './NavLink';
import { NavWrapper, NavContainer, NavLinksWrapper } from './styles';

type Props = {
  logoColor: ImageType;
  logoMonochrome: ImageType;
  navGroup: KeyedArray<NavGroupType>;
};

export const MobileNav: FC<Props> = ({
  logoColor,
  logoMonochrome,
  navGroup,
}) => {
  const { mobileNavOpen, toggleGlobalNav } = useUIProvider();
  const logo = mobileNavOpen
    ? logoMonochrome?.asset?.url
    : logoColor?.asset?.url;
  return (
    <nav
      className={cn(
        NavWrapper,
        mobileNavOpen ? 'bg-yellow' : 'bg-transparent',
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
          {!mobileNavOpen && (
            <SimpleIcon type="menu" width={24} color="#131D2B" />
          )}
          {mobileNavOpen && (
            <SimpleIcon type="close" width={24} color="white" />
          )}
        </button>
      </div>

      {mobileNavOpen && (
        <div className={cn(NavLinksWrapper)}>
          {navGroup.map((navItem) => (
            <NavLink key={navItem._key} navItem={navItem} isMobile />
          ))}
        </div>
      )}
    </nav>
  );
};
