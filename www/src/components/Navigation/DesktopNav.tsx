import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useRect } from '@/hooks/useRect';
import { LogotypeColor, LogotypeMonochrome } from '@/svgs/Logotype';
import { Button } from '@/atoms/Button';
import { KeyedArray, NavGroupType, DoubleCta } from '@/types/sanity';
import { useUIProvider } from '@/context/UIProvider';
import { NavCTA } from '../NavCTA';
import { NavGroup } from './NavGroup';
import { NavWrapper, NavContainer, NavLinksWrapper } from './styles';

type Props = {
  navGroup: KeyedArray<NavGroupType>;
  showNavCTA: boolean;
  globalDoubleNav: DoubleCta;
};

export const DesktopNav: FC<Props> = ({
  navGroup,
  showNavCTA,
  globalDoubleNav,
}) => {
  const { getStartedOpen, setGetStartedOpen } = useUIProvider();
  const [desktopNavRect, desktopNavRef] = useRect();

  const handleCTAClick = () => {
    setGetStartedOpen(!getStartedOpen);
  };

  return (
    <nav
      ref={desktopNavRef}
      className={cn(NavWrapper, 'hidden')}
      tabIndex={desktopNavRect && desktopNavRect.width > 0 ? 0 : -1}
    >
      <div
        className={cn(NavContainer, {
          'bg-yellow': getStartedOpen,
        })}
      >
        <Link
          className="element-focus p-2 -ml-2"
          href="/"
          aria-label="Navigate to Firefly homepage"
        >
          <div className="w-[175px]">
            {getStartedOpen ? <LogotypeMonochrome /> : <LogotypeColor />}
          </div>
        </Link>

        <div className={cn(NavLinksWrapper)}>
          {navGroup.map((navItem) => (
            <div
              key={navItem._key}
              aria-hidden={getStartedOpen}
              className={cn('transition-all', {
                'opacity-0 pointer-events-none': getStartedOpen,
              })}
            >
              <NavGroup navItem={navItem} />
            </div>
          ))}
          {showNavCTA && (
            <div className="w-[190px]">
              <Button
                id={`get-started-nav-cta`}
                label={getStartedOpen ? 'Close' : 'Get started'}
                width="full"
                onClick={handleCTAClick}
                variant="primary"
                bgColorOverride={
                  getStartedOpen ? 'bg-yellow-light' : 'bg-yellow'
                }
              />
            </div>
          )}
        </div>
      </div>
      {/* Wrapping NavCTA with a div controlling it's display property helps remove child links from list of focusable items when it is hidden */}
      <div className={getStartedOpen ? '' : 'hidden'}>
        <NavCTA globalDoubleNav={globalDoubleNav} isOpen={getStartedOpen} />
      </div>
    </nav>
  );
};
