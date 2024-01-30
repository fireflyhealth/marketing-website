import { AppProps } from 'next/app';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { Navigation } from '@/components/Navigation';
import { UIProvider } from '@/context';
import * as SanityTypes from '@/types/sanity';
import { DefaultMetadata } from '@/components/Metadata/DefaultMetadata';
import { ColorTheme, Theme } from '@/components/Theme';
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
  return (
    <>
      <DefaultMetadata metadata={siteSettings.defaultMetadata} />
      <Theme theme={ColorTheme.White}>
        <UIProvider>
          <AnnouncementBanner
            announcementBanner={
              announcementBannerOverride || globalAnnouncementBanner
            }
          />
          <Navigation
            navigation={customPageNav || globalNav}
            showNavCTA={siteSettings.globalNav.showNavCTA}
          />
          <main className="mt-mobile-nav-banner-margin md:mt-desktop-nav-banner-margin">
            <Component {...pageProps} />
          </main>
          {/* TODO: Footer */}
        </UIProvider>
      </Theme>
    </>
  );
}
