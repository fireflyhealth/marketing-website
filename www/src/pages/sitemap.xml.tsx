import { GetServerSideProps } from 'next';
import { SitemapData } from '@/lib/sanity';
import { urlForDocument } from '@/utils/linking';

import * as Sanity from '@/lib/sanity';

const Sitemap = () => {
  // getServerSideProps will do the heavy lifting
};

const generateSitemap = (sitemapData: SitemapData) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      <url>
        <loc>${urlForDocument(sitemapData.homepage)}</loc>
        <lastmod>${sitemapData.homepage._updatedAt}</lastmod>
      </url>
      <url>
        <loc>${urlForDocument(sitemapData.faqPage)}</loc>
        <lastmod>${sitemapData.faqPage._updatedAt}</lastmod>
      </url>
      <url>
        <loc>${urlForDocument(sitemapData.contactPage)}</loc>
        <lastmod>${sitemapData.contactPage._updatedAt}</lastmod>
      </url>
      <url>
        <loc>${urlForDocument(sitemapData.downloadPage)}</loc>
        <lastmod>${sitemapData.downloadPage._updatedAt}</lastmod>
      </url>
      ${sitemapData.genericPage
        .map(
          (doc) => `
          <url>
            <loc>${urlForDocument(doc)}</loc>
            <lastmod>${doc._updatedAt}</lastmod>
          </url>`,
        )
        .join('')}
      ${sitemapData.subPage
        .map(
          (doc) => `
          <url>
            <loc>${urlForDocument(doc)}</loc>
            <lastmod>${doc._updatedAt}</lastmod>
          </url>`,
        )
        .join('')}
      ${sitemapData.blog
        .map(
          (doc) => `
          <url>
            <loc>${urlForDocument(doc)}</loc>
            <lastmod>${doc._updatedAt}</lastmod>
          </url>`,
        )
        .join('')}
      ${sitemapData.blogArticle
        .map(
          (doc) => `
          <url>
            <loc>${urlForDocument(doc)}</loc>
            <lastmod>${doc._updatedAt}</lastmod>
          </url>`,
        )
        .join('')}
      ${sitemapData.clientPage
        .map(
          (doc) => `
          <url>
            <loc>${urlForDocument(doc)}</loc>
            <lastmod>${doc._updatedAt}</lastmod>
          </url>`,
        )
        .join('')}
      ${sitemapData.practitioner
        .map(
          (doc) => `
          <url>
            <loc>${urlForDocument(doc)}</loc>
            <lastmod>${doc._updatedAt}</lastmod>
          </url>`,
        )
        .join('')}
    </urlset>
  `;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const documents = await Sanity.Sitemap.get();

  const sitemap = generateSitemap(documents);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
