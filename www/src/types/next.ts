import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps as NextGetStaticProps, PreviewData } from 'next';
import { SiteSettings } from './sanity';

/**
 * All GetStaticProps functions should include siteSettings
 */
export type GetStaticProps<
  PageProps extends { [key: string]: any },
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData,
> = NextGetStaticProps<
  PageProps & { siteSettings: SiteSettings },
  Params,
  Preview
>;
