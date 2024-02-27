import { AppProps } from 'next/app';
import { HubspotProvider } from 'next-hubspot';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { Navigation } from '@/components/Navigation';
import { UIProvider } from '@/context';
import * as SanityTypes from '@/types/sanity';
import { DefaultMetadata } from '@/components/Metadata/DefaultMetadata';
import { ColorTheme, Theme } from '@/components/Theme';
import { Footer } from '@/components/Footer';
import '@/lib/datadog';
import '../styles/fonts.css';
import '../styles/main.css';

type Props = AppProps<{
  siteSettings: SanityTypes.SiteSettings;
  navigationOverrides?: SanityTypes.NavigationOverrides;
}>;

export default function App({ Component, pageProps: allPageProps }: Props) {
  const { siteSettings, navigationOverrides, ...pageProps } = allPageProps;

  const globalNav = siteSettings.globalNav;
  const customPageNav = navigationOverrides?.pageNavigation;

  const globalAnnouncementBanner = siteSettings.globalAnnouncementBanner;
  const announcementBannerOverride = navigationOverrides?.announcementBanner;

  const globalNavCTA = globalNav.showNavCTA;
  const navCTAOverride = navigationOverrides?.pageNavigation?.showNavCTA;

  const globalDoubleCta = siteSettings.globalDoubleCta;
  return (
    <>
      <DefaultMetadata metadata={siteSettings.defaultMetadata} />
      <Theme theme={ColorTheme.White} className="overflow-hidden">
        <UIProvider>
          <HubspotProvider>
            <AnnouncementBanner
              announcementBanner={
                announcementBannerOverride || globalAnnouncementBanner
              }
            />
            <Navigation
              navigation={customPageNav || globalNav}
              showNavCTA={
                navCTAOverride != undefined ? navCTAOverride : globalNavCTA
              }
              globalDoubleNav={globalDoubleCta}
            />
            <main className="mt-mobile-nav-banner-margin md:mt-desktop-nav-banner-margin max-w-[1920px] mx-auto">
              <Component {...pageProps} />
            </main>
            <Footer footer={siteSettings.footer} />
          </HubspotProvider>
        </UIProvider>
      </Theme>
    </>
  );
}
