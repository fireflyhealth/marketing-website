import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { KeyedArray, NavGroupType } from '@/types/sanity';
import { useUIProvider } from '@/context/UIProvider';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

type Props = {
  navGroup: KeyedArray<NavGroupType>;
};

export const Navigation: FC<Props> = ({ navGroup }) => {
  const { setMobileNavOpen } = useUIProvider();
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
      <MobileNav navGroup={navGroup} />
      <DesktopNav navGroup={navGroup} />
    </>
  );
};
