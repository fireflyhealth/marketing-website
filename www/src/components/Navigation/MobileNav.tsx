import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import * as SanityTypes from '@/types/sanity';
import { useUIProvider } from '@/context/UIProvider';
import { LogotypeColor, LogotypeMonochrome } from '@/svgs/Logotype';
import { NavGroup } from './NavGroup';
import { NavWrapper, NavContainer, NavLinksWrapper } from './styles';

// TODO: replace next/link and next/image with Link and Image compoents
// after they get created.

type Props = {
  navGroup: SanityTypes.KeyedArray<SanityTypes.NavGroupType>;
};

export const MobileNav: FC<Props> = ({ navGroup }) => {
  const { mobileNavOpen, toggleGlobalNav } = useUIProvider();
  return (
    <nav
      className={cn(
        NavWrapper,
        mobileNavOpen ? 'bg-yellow' : 'bg-transparent',
        'absolute md:hidden',
      )}
    >
      <div className={cn(NavContainer)}>
        <Link href="/">
          <div className="w-[120px]">
            {mobileNavOpen ? <LogotypeMonochrome /> : <LogotypeColor />}
          </div>
        </Link>

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
            <NavGroup key={navItem._key} navItem={navItem} isMobile />
          ))}
        </div>
      )}
    </nav>
  );
};
