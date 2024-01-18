import { AppProps } from 'next/app';
import '../styles/main.css';

import { SiteSettings } from '@/types/sanity';
import { DefaultMetadata } from '@/components/Metadata/DefaultMetadata';
import { ColorTheme, Theme } from '@/components/Theme';

type Props = AppProps<{
  siteSettings: SiteSettings;
}>;

export default function App({ Component, pageProps: allPageProps }: Props) {
  const { siteSettings, ...pageProps } = allPageProps;
  return (
    <>
      <DefaultMetadata metadata={siteSettings.defaultMetadata} />
      {/* TODO: Navigation */}
      <Theme theme={ColorTheme.White}>
        <main className="font-trust">
          <Component {...pageProps} />;
        </main>
      </Theme>
      {/* TODO: Footer */}
    </>
  );
}
