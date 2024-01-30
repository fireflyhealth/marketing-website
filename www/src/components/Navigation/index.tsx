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
      <MobileNav navGroup={navigation.navGroup} showNavCTA={showNavCTA} />
      <DesktopNav navGroup={navigation.navGroup} showNavCTA={showNavCTA} />
    </>
  );
};
