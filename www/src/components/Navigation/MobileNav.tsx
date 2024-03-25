import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useRect } from '@/hooks/useRect';
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
  const [mobileNavRect, mobileNavRef] = useRect();
  return (
    <nav
      ref={mobileNavRef}
      className={cn(NavWrapper, 'absolute lg:hidden')}
      tabIndex={mobileNavRect && mobileNavRect.width > 0 ? 0 : -1}
    >
      <div
        className={cn(
          NavContainer,
          mobileNavOpen ? 'bg-yellow' : 'bg-transparent',
        )}
      >
        <Link
          href="/"
          className="element-focus p-2 -ml-2 -mt-2"
          aria-label="Navigate to Firefly homepage"
        >
          <div className="w-[120px] md:w-[175px]">
            {mobileNavOpen ? <LogotypeMonochrome /> : <LogotypeColor />}
          </div>
        </Link>

        {/* menu button only visible on tablet and mobile */}
        <button
          className="lg:hidden element-focus p-2 -mr-2 -mt-2"
          onClick={toggleGlobalNav}
          aria-label={
            mobileNavOpen
              ? 'Open mobile navigation menu'
              : 'Close mobile navigation menu'
          }
        >
          {mobileNavOpen ? (
            <SimpleIcon type="close" wrapperStyles="w-6 text-yellow-light" />
          ) : (
            <SimpleIcon type="menu" wrapperStyles="w-6 text-black" />
          )}
        </button>
      </div>

      {mobileNavOpen && (
        <div
          className="absolute w-full top-[56px] lg:top-[65px]"
          tabIndex={mobileNavOpen ? 0 : -1}
        >
          <div className={cn(NavLinksWrapper)}>
            {navGroup.map((navItem) => (
              <NavGroup key={navItem._key} navItem={navItem} isMobile />
            ))}
          </div>
          {showNavCTA && (
            <NavCTA globalDoubleNav={globalDoubleNav} isOpen={true} />
          )}
        </div>
      )}
    </nav>
  );
};
