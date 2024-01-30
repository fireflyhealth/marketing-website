import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation as NavigationType } from '@/types/sanity';
import { useUIProvider } from '@/context/UIProvider';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

type Props = {
  navigation: NavigationType;
  showNavCTA: boolean;
};

export const Navigation: FC<Props> = ({ navigation, showNavCTA }) => {
  const { setMobileNavOpen, getStartedOpen, mobileNavOpen } = useUIProvider();
  const router = useRouter();

  // close globalNav and globalNavDropdown on route change
  useEffect(() => {
    const closeMobileNav = () => setMobileNavOpen(false);
    router.events.on('routeChangeStart', closeMobileNav);
    return () => {
      router.events.off('routeChangeStart', closeMobileNav);
    };
  }, [router, setMobileNavOpen]);
  return (
    <>
      <MobileNav navGroup={navigation.navGroup} />
      <DesktopNav navGroup={navigation.navGroup} showNavCTA={showNavCTA} />
    </>
  );
};
