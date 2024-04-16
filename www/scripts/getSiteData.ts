/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import prettier from 'prettier';
import * as Sanity from '@/lib/sanity';
import {
  ContactPage,
  DownloadPage,
  FAQPage,
  GenericPage,
  GenericPageSlugInfo,
  Homepage,
  SiteSettings,
  NotFoundPage,
} from '@/types/sanity';

const jsonFilePath = path.resolve(
  __dirname,
  '../src/lib/sanity/sanityData.json',
);

const main = async () => {
  const siteData: {
    siteSettings?: SiteSettings;
    homePage?: Homepage;
    genericPages?: { [slug: string]: GenericPage };
    genericPageSlugInfo?: GenericPageSlugInfo;
    contactPage?: ContactPage | null;
    downloadPage?: DownloadPage | null;
    notFoundPage?: NotFoundPage | null;
    faqPage?: FAQPage | null;
  } = {};

  //global site data
  const [siteSettings] = await Promise.all([Sanity.siteSettings.get()]);
  siteData.siteSettings = siteSettings;

  //homepage & special page data
  const [homePage, downloadPage, contactPage, notFoundPage, faqPage] =
    await Promise.all([
      Sanity.homepage.get(),
      Sanity.downloadPage.get(),
      Sanity.contactPage.get(),
      Sanity.notFoundPage.get(),
      Sanity.faqPage.get(),
    ]);
  siteData.homePage = homePage;
  siteData.contactPage = contactPage;
  siteData.downloadPage = downloadPage;
  siteData.notFoundPage = notFoundPage;
  siteData.faqPage = faqPage;

  // generic page data
  const genericPageSlugInfo = await Sanity.page.getSlugInfo();
  const genericPages = await Promise.all(
    genericPageSlugInfo.map(
      async ({ slug }) => await Sanity.page.get(slug.current),
    ),
  );
  const genericPagesObj = genericPages.reduce(
    (pageObj: { [slug: string]: GenericPage }, page) => {
      if (page?.slug.current) {
        pageObj[page.slug.current] = page;
      }
      return pageObj;
    },
    {},
  );
  siteData.genericPages = genericPagesObj;
  siteData.genericPageSlugInfo = genericPageSlugInfo;

  const fileContents = await prettier.format(JSON.stringify(siteData, null), {
    parser: 'json',
  });

  fs.writeFileSync(jsonFilePath, fileContents, 'utf8');
  console.log('Site data fetched');
};

main();
