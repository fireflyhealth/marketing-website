import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { useUIProvider } from '@/context/UIProvider';
import { KeyedArray, NavGroupType, DoubleCta } from '@/types/sanity';
import { LogotypeColor, LogotypeMonochrome } from '@/svgs/Logotype';
import { NavCTA } from '../NavCTA';
import { NavGroup } from './NavGroup';
import { NavWrapper, NavContainer, NavLinksWrapper } from './styles';

type Props = {
  navGroup: KeyedArray<NavGroupType>;
  showNavCTA: boolean;
  globalDoubleNav: DoubleCta;
};

export const MobileNav: FC<Props> = ({
  navGroup,
  showNavCTA,
  globalDoubleNav,
}) => {
  const { mobileNavOpen, toggleGlobalNav } = useUIProvider();
  return (
    <nav className={cn(NavWrapper, 'absolute md:hidden')}>
      <div
        className={cn(
          NavContainer,
          mobileNavOpen ? 'bg-yellow' : 'bg-transparent',
        )}
      >
        <Link href="/">
          <div className="w-[120px]">
            {mobileNavOpen ? <LogotypeMonochrome /> : <LogotypeColor />}
          </div>
        </Link>

        {/* menu button only visible on tablet and mobile */}
        <button className="md:hidden" onClick={toggleGlobalNav}>
          {mobileNavOpen ? (
            <SimpleIcon type="close" width={24} className="text-yellow-light" />
          ) : (
            <SimpleIcon type="menu" width={24} className="text-black" />
          )}
        </button>
      </div>

      {mobileNavOpen && (
        <>
          <div className={cn(NavLinksWrapper)}>
            {navGroup.map((navItem) => (
              <NavGroup key={navItem._key} navItem={navItem} isMobile />
            ))}
          </div>
          {showNavCTA && <NavCTA globalDoubleNav={globalDoubleNav} />}
        </>
      )}
    </nav>
  );
};
