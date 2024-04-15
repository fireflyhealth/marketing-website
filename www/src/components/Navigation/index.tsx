import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation as NavigationType, DoubleCta } from '@/types/sanity';
import { useUIProvider } from '@/context/UIProvider';
import { useBodyLock } from '@/hooks/useBodyLock';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

type Props = {
  navigation: NavigationType;
  showNavCTA: boolean;
  globalDoubleNav: DoubleCta;
};

export const Navigation: FC<Props> = ({
  navigation,
  showNavCTA,
  globalDoubleNav,
}) => {
  const { setMobileNavOpen, getStartedOpen, setGetStartedOpen } =
    useUIProvider();
  const router = useRouter();

  // close globalNav and globalNavDropdown on route change
  useEffect(() => {
    const closeNavDropdowns = () => {
      setMobileNavOpen(false);
      setGetStartedOpen(false);
    };
    router.events.on('routeChangeStart', closeNavDropdowns);
    return () => {
      router.events.off('routeChangeStart', closeNavDropdowns);
    };
  }, [router, setMobileNavOpen, setGetStartedOpen]);

  useEffect(() => {
    // Handle keyboard events (open/close dropdown, select option)
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'Escape') {
        setMobileNavOpen(false);
        setGetStartedOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [getStartedOpen, setGetStartedOpen, setMobileNavOpen]);

  // Lock body scroll when the secondary nav (navCTA/'Get Started') is open
  useBodyLock(getStartedOpen);

  return (
    <>
      <MobileNav
        navGroup={navigation.navGroup}
        showNavCTA={showNavCTA}
        globalDoubleNav={globalDoubleNav}
      />
      <DesktopNav
        navGroup={navigation.navGroup}
        showNavCTA={showNavCTA}
        globalDoubleNav={globalDoubleNav}
      />
    </>
  );
};
