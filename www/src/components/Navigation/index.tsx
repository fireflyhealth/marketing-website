import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as SanityTypes from '@/types/sanity';
import { useUIProvider } from '@/hooks';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

type Props = {
  logoColor: SanityTypes.Image;
  logoMonochrome: SanityTypes.Image;
  navLinks: SanityTypes.NavLinkObject[];
};

export const Navigation: FC<Props> = ({
  logoColor,
  logoMonochrome,
  navLinks,
}) => {
  const { globalNavOpen, setGlobalNavOpen } = useUIProvider();
  const router = useRouter();

  // close globalNav and globalNavDropdown on route change
  useEffect(() => {
    if (globalNavOpen) {
      setGlobalNavOpen(false);
    }
  }, [router.asPath]);
  return (
    <>
      <MobileNav
        logoColor={logoColor}
        logoMonochrome={logoMonochrome}
        navLinks={navLinks}
      />
      <DesktopNav logoColor={logoColor} navLinks={navLinks} />
    </>
  );
};
