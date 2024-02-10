import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation as NavigationType, DoubleCta } from '@/types/sanity';
import { useUIProvider } from '@/context/UIProvider';
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
  const { setMobileNavOpen, setGetStartedOpen } = useUIProvider();
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
