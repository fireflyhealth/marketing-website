import { AppProps } from 'next/app';
import { Navigation } from '@/components/Navigation';
import { UIProvider } from '@/context';
import { SiteSettings } from '@/types/sanity';
import { DefaultMetadata } from '@/components/Metadata/DefaultMetadata';
import { ColorTheme, Theme } from '@/components/Theme';
import '../styles/fonts.css';
import '../styles/main.css';

type Props = AppProps<{
  siteSettings: SiteSettings;
}>;

export default function App({ Component, pageProps: allPageProps }: Props) {
  const { siteSettings, ...pageProps } = allPageProps;
  return (
    <>
      <DefaultMetadata metadata={siteSettings.defaultMetadata} />
      <Theme theme={ColorTheme.White}>
        <UIProvider>
          <Navigation navGroup={siteSettings.globalNav.navGroup} />
          <main className="mt-mobile-globalnav-height md:mt-desktop-globalnav-height">
            <Component {...pageProps} />
          </main>
          {/* TODO: Footer */}
        </UIProvider>
      </Theme>
    </>
  );
}
