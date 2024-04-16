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
  const { mobileNavOpen, setMobileNavOpen, getStartedOpen, setGetStartedOpen } =
    useUIProvider();
  const router = useRouter();

  // useEffect to handle closing navCTA/'Get Started' and mobile nav on route change
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

  // useEffect to handle clicking outside of the desktop and mobile navs
  useEffect(() => {
    const mobileNav = document.getElementById('mobile-nav');
    const desktopNav = document.getElementById('desktop-nav');

    const handleClickOutsideNav = (event: MouseEvent) => {
      const { target } = event;

      // close navCTA/'Get Started' when user clicks outside of nav
      if (target && getStartedOpen == true) {
        if (!desktopNav?.contains(target as Element)) {
          setGetStartedOpen(false);
        }
      }

      // close mobile nav when user clicks outside of nav
      if (target && mobileNavOpen == true) {
        if (!mobileNav?.contains(target as Element)) {
          setMobileNavOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutsideNav);
  }, [getStartedOpen, setGetStartedOpen, mobileNavOpen, setMobileNavOpen]);

  // useEffect to handle keyboard event 'Escape' to close nav
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
