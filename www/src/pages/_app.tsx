import { AppProps } from 'next/app';
import '../styles/fonts.css';
import '../styles/main.css';

import { SiteSettings } from '@/types/sanity';
import { DefaultMetadata } from '@/components/Metadata/DefaultMetadata';

type Props = AppProps<{
  siteSettings: SiteSettings;
}>;

export default function App({ Component, pageProps: allPageProps }: Props) {
  const { siteSettings, ...pageProps } = allPageProps;
  return (
    <>
      <DefaultMetadata metadata={siteSettings.defaultMetadata} />
      {/* TODO: Navigation */}
      <main>
        <Component {...pageProps} />;
      </main>
      {/* TODO: Footer */}
    </>
  );
}
