import { FC } from 'react';
import Link from 'next/link';
import cn from 'classnames';
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

  const handleCTAClick = () => {
    setGetStartedOpen(!getStartedOpen);
  };
  return (
    <nav className={cn(NavWrapper, 'hidden')}>
      <div className={cn(NavContainer)}>
        <Link href="/">
          <div className="w-[175px]">
            {getStartedOpen ? <LogotypeMonochrome /> : <LogotypeColor />}
          </div>
        </Link>

        <div className={cn(NavLinksWrapper)}>
          {navGroup.map((navItem) => (
            <div
              key={navItem._key}
              className={cn(getStartedOpen ? 'hidden' : '')}
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
      {getStartedOpen && <NavCTA globalDoubleNav={globalDoubleNav} />}
    </nav>
  );
};
