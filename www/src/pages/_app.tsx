import React from 'react';
import { AppProps } from 'next/app';
import { HubspotProvider } from 'next-hubspot';
import { GoogleTagManager } from '@next/third-parties/google';
import { ABCookieManager } from '@/utils/storage';
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
  // eslint-disable-next-line no-console
  console.log('environment', process.env.NEXT_PUBLIC_VERCEL_ENV);
  return (
    <>
      <DefaultMetadata metadata={siteSettings.defaultMetadata} />
      {/* We control overflow from the highest parent container outside of all sitewide padding and margin.
          For mobile devices, overflow is set to 'clip' as opposed to 'hidden' to keep all content within width, padding and margin boundaries
          while allowing content that should bleed off the page to do so without causing any layout shifts.
          Documentation: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#clip
      */}
      <Theme
        theme={ColorTheme.White}
        className="overflow-clip lg:overflow-visible"
      >
        <UIProvider>
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
            <HubspotProvider strategy="lazyOnload">
              <main>
                <Component {...pageProps} />
              </main>
            </HubspotProvider>
            <Footer footer={siteSettings.footer} />
          </div>
        </UIProvider>
      </Theme>

      {/* Third-party Scripts */}
      {config.googleTagManager.id ? (
        <GoogleTagManager gtmId={config.googleTagManager.id} />
      ) : null}
    </>
  );
}

/**
 * Provide a utility for A/B test creators to switch their current group
 */

if (typeof window !== 'undefined') {
  window.setABCookie = (value?: string) => {
    if (!value) {
      console.error('You must provide a value of "test" or "control"');
    }
    if (value !== 'test' && value !== 'control') {
      console.error(`"${value}" is invalid - must be "test" or "control"`);
    }
    const cookieValue =
      value === 'test'
        ? config.googleTagManager.ab.cookieTestGroupValue
        : config.googleTagManager.ab.cookieControlGroupValue;

    ABCookieManager.set(cookieValue);
    // eslint-disable-next-line no-console
    console.log(`Set AB cookie to ${value}: ${cookieValue}`);
  };
  window.getABCookie = () =>
    // eslint-disable-next-line no-console
    console.log(`Current AB cookie value: ${ABCookieManager.get()}`);
}
