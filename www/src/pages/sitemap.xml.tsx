import { GetServerSideProps } from 'next';

import * as Sanity from '@/lib/sanity';
import { LinkableDocumentData } from '@/types/sanity';
import { getLinkableDocumentProductionUrl } from '@/utils/linking';
import { config } from '../config';

/**
 * Simple function to format date
 * @param date string
 * @returns date in YYYY-MM-DD
 */
const formatDate = (date: string) =>
  new Date(date).toISOString().substring(0, 10);

/* Yanked and adapted from:
 * https://nextjs.org/learn-pages-router/seo/crawling-and-indexing/xml-sitemaps
 */
const generateSitemapSection = (
  items: LinkableDocumentData | LinkableDocumentData[],
): string =>
  Array.isArray(items)
    ? items
        .map(
          (item) => `
<url>
  <loc>${getLinkableDocumentProductionUrl(item)}</loc>
  ${item._updatedAt && `<lastmod>${formatDate(item._updatedAt)}</lastmod>`}
</url>
`,
        )
        .join('')
    : `
<url>
  <loc>${getLinkableDocumentProductionUrl(items)}</loc>
  ${items._updatedAt && `<lastmod>${formatDate(items._updatedAt)}</lastmod>`}
</url>
`;

const generateSiteMap = ({
  homepage,
  faqPage,
  contactPage,
  downloadPage,
  genericPage,
  subPage,
  blog,
  blogArticle,
  clientPage,
  practitioner,
}: Sanity.SitemapData) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${config.metadata.productionUrl}</loc>
      ${homepage._updatedAt && `<lastmod>${formatDate(homepage._updatedAt)}</lastmod>`}
    </url>
    ${faqPage && generateSitemapSection(faqPage)}
    ${contactPage && generateSitemapSection(contactPage)}
    ${downloadPage && generateSitemapSection(downloadPage)}
    ${genericPage.length && generateSitemapSection(genericPage)}
    ${subPage.length && generateSitemapSection(subPage)}
    ${blog.length && generateSitemapSection(blog)}
    ${blogArticle.length && generateSitemapSection(blogArticle)}
    ${clientPage.length && generateSitemapSection(clientPage)}
    ${practitioner.length && generateSitemapSection(practitioner)}
  </urlset>
 `;
};

function Sitemap() {
  //
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pages = await Sanity.Sitemap.get();
  if (!pages) {
    throw new Error('Could not fetch sitemap data');
  }

  const sitemap = generateSiteMap(pages);
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
};

export default Sitemap;
