import React from 'react';
import { AppProps } from 'next/app';
import { HubspotProvider } from 'next-hubspot';
import { GoogleTagManager } from '@next/third-parties/google';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { Navigation } from '@/components/Navigation';
import { UIProvider } from '@/context';
import * as SanityTypes from '@/types/sanity';
import { DefaultMetadata } from '@/components/Metadata/DefaultMetadata';
import { ColorTheme, Theme } from '@/components/Theme';
import { Footer } from '@/components/Footer';
import '@/lib/datadog';
import { config } from '@/config';
import '../styles/fonts.css';
import '../styles/main.css';
import 'what-input';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const ReactDOM = require('react-dom');
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

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
      <Theme
        theme={ColorTheme.White}
        className="overflow-hidden lg:overflow-visible"
      >
        <UIProvider>
          <HubspotProvider>
            <AnnouncementBanner
              announcementBanner={
                announcementBannerOverride || globalAnnouncementBanner
              }
            />
            <div className="container-max-width container-padding">
              <Navigation
                navigation={customPageNav || globalNav}
                showNavCTA={
                  navCTAOverride != undefined ? navCTAOverride : globalNavCTA
                }
                globalDoubleNav={globalDoubleCta}
              />
              <main>
                <Component {...pageProps} />
              </main>
              <Footer footer={siteSettings.footer} />
            </div>
            {config.googleTagManager.id ? (
              <GoogleTagManager gtmId={config.googleTagManager.id} />
            ) : null}
          </HubspotProvider>
        </UIProvider>
      </Theme>
    </>
  );
}
