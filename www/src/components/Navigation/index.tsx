import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as SanityTypes from '@/types/sanity';
import { useUIProvider } from '@/context/UIProvider';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

type Props = {
  logoColor: SanityTypes.Image;
  logoMonochrome: SanityTypes.Image;
  navGroup: SanityTypes.NavGroup[];
};

export const Navigation: FC<Props> = ({
  logoColor,
  logoMonochrome,
  navGroup,
}) => {
  const { mobileNavOpen, setMobileNavOpen } = useUIProvider();
  const router = useRouter();

  // close globalNav and globalNavDropdown on route change
  useEffect(() => {
    if (mobileNavOpen) {
      setMobileNavOpen(false);
    }
  }, [router.asPath]);
  return (
    <>
      <MobileNav
        logoColor={logoColor}
        logoMonochrome={logoMonochrome}
        navGroup={navGroup}
      />
      <DesktopNav logoColor={logoColor} navGroup={navGroup} />
    </>
  );
};
