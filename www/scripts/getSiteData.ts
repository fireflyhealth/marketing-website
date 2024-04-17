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
  ClientPage,
  SubPage,
  Blog,
  BlogWithArticles,
  BlogArticle,
  Practitioner,
} from '@/types/sanity';

const jsonFilePath = path.resolve(
  __dirname,
  '../src/lib/sanity/sanityData.json',
);

const getHomeAndSpecialPages = async () => {
  const [
    homePage,
    homeBPage,
    downloadPage,
    downloadBPage,
    contactPage,
    contactBPage,
    notFoundPage,
    faqPage,
  ] = await Promise.all([
    Sanity.homepage.get({ generateStaticData: true }),
    Sanity.homepage.get({ preferBContent: true, generateStaticData: true }),
    Sanity.downloadPage.get({ generateStaticData: true }),
    Sanity.downloadPage.get({ preferBContent: true, generateStaticData: true }),
    Sanity.contactPage.get({ generateStaticData: true }),
    Sanity.contactPage.get({ preferBContent: true, generateStaticData: true }),
    Sanity.notFoundPage.get({ generateStaticData: true }),
    Sanity.faqPage.get({ generateStaticData: true }),
  ]);

  return {
    homePage: homePage,
    homeBPage: homeBPage,
    contactPage: contactPage,
    contactBPage: contactBPage,
    downloadPage: downloadPage,
    downloadBPage: downloadBPage,
    notFoundPage: notFoundPage,
    faqPage: faqPage,
  };
};

const getGenericPages = async () => {
  const genericPageSlugInfo = await Sanity.page.getSlugInfo({
    generateStaticData: true,
  });
  const genericPages = await Promise.all(
    genericPageSlugInfo.map(
      async ({ slug }) =>
        await Sanity.page.get(slug.current, { generateStaticData: true }),
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

  const genericBPages = await Promise.all(
    genericPageSlugInfo.map(
      async ({ slug }) =>
        await Sanity.page.get(slug.current, {
          preferBContent: true,
          generateStaticData: true,
        }),
    ),
  );
  const genericBPagesObj = genericBPages.reduce(
    (pageObj: { [slug: string]: GenericPage }, page) => {
      if (page?.slug.current) {
        pageObj[page.slug.current] = page;
      }
      return pageObj;
    },
    {},
  );

  return {
    genericPages: { ...genericPagesObj, ...genericBPagesObj },
    genericPageSlugInfo: genericPageSlugInfo,
  };
};

const getGenericSubPages = async () => {
  const genericSubPageSlugInfo = await Sanity.page.getSlugInfo({
    generateStaticData: true,
  });
  const sanitizedGenericSubPageSlugInfo = Sanity.subPage.getSlugParams(
    genericSubPageSlugInfo,
  );
  const genericSubPages = await Promise.all(
    sanitizedGenericSubPageSlugInfo.map(
      async ({ pageSlug, subpageSlug }) =>
        await Sanity.subPage.get(pageSlug, subpageSlug, {
          generateStaticData: true,
        }),
    ),
  );
  const genericSubPagesObj = genericSubPages.reduce(
    (
      subpageObj: { [pageSlug: string]: { [subpageSlug: string]: SubPage } },
      subpage,
    ) => {
      const pageSlug = subpage?.parentPage?.slug.current;
      const subpageSlug = subpage?.slug.current;
      if (subpageSlug && pageSlug) {
        if (subpageObj[pageSlug]) {
          subpageObj[pageSlug][subpageSlug] = subpage;
        } else {
          subpageObj[pageSlug] = {
            [subpageSlug]: subpage,
          };
        }
      }
      return subpageObj;
    },
    {},
  );

  const genericSubBPages = await Promise.all(
    sanitizedGenericSubPageSlugInfo.map(async ({ pageSlug, subpageSlug }) => {
      const subBPage = await Sanity.subPage.get(pageSlug, subpageSlug, {
        preferBContent: true,
        generateStaticData: true,
      });
      // subPage B content doesn't have a parentPage field, so we need to pass parent page slug info down.
      return { subBPage, pageSlug, subpageSlug };
    }),
  );

  const genericSubABPagesObj = genericSubBPages.reduce(
    (
      subpageObj: {
        [pageSlug: string]: { [subpageSlug: string]: SubPage | null };
      },
      subpage,
    ) => {
      const pageSlug = subpage?.pageSlug;
      const subpageSlug = subpage?.subBPage?.slug.current;
      if (subpageSlug && pageSlug) {
        if (subpageObj[pageSlug]) {
          subpageObj[pageSlug][subpageSlug] = subpage.subBPage;
        } else {
          subpageObj[pageSlug] = {
            [subpageSlug]: subpage.subBPage,
          };
        }
      }
      return subpageObj;
    },
    genericSubPagesObj,
  );

  return {
    genericSubPages: { ...genericSubABPagesObj },
  };
};

const getClientPages = async () => {
  const clientPageSlugInfo = await Sanity.clientPage.getSlugInfo({
    generateStaticData: true,
  });
  const clientPages = await Promise.all(
    clientPageSlugInfo.map(
      async ({ slug }) =>
        await Sanity.clientPage.get(slug.current, { generateStaticData: true }),
    ),
  );
  const clientPagesObj = clientPages.reduce(
    (pageObj: { [slug: string]: ClientPage }, page) => {
      if (page?.slug.current) {
        pageObj[page.slug.current] = page;
      }
      return pageObj;
    },
    {},
  );

  const clientBPages = await Promise.all(
    clientPageSlugInfo.map(
      async ({ slug }) =>
        await Sanity.clientPage.get(slug.current, {
          preferBContent: true,
          generateStaticData: true,
        }),
    ),
  );
  const clientBPagesObj = clientBPages.reduce(
    (pageObj: { [slug: string]: ClientPage }, page) => {
      if (page?.slug.current) {
        pageObj[page.slug.current] = page;
      }
      return pageObj;
    },
    {},
  );

  return {
    clientPages: { ...clientPagesObj, ...clientBPagesObj },
    clientPageSlugInfo: clientPageSlugInfo,
  };
};

const getBlogPages = async () => {
  const blogPageSlugInfo = await Sanity.blog.getSlugInfo({
    generateStaticData: true,
  });
  const blogPages = await Promise.all(
    blogPageSlugInfo.map(
      async ({ slug }) =>
        await Sanity.blog.get(slug.current, { generateStaticData: true }),
    ),
  );
  const blogPagesObj = blogPages.reduce(
    (pageObj: { [slug: string]: Blog }, page) => {
      if (page?.slug.current) {
        pageObj[page.slug.current] = page;
      }
      return pageObj;
    },
    {},
  );

  const blogBPages = await Promise.all(
    blogPageSlugInfo.map(
      async ({ slug }) =>
        await Sanity.blog.get(slug.current, {
          preferBContent: true,
          generateStaticData: true,
        }),
    ),
  );
  const blogBPagesObj = blogBPages.reduce(
    (pageObj: { [slug: string]: Blog }, page) => {
      if (page?.slug.current) {
        pageObj[page.slug.current] = page;
      }
      return pageObj;
    },
    {},
  );

  return {
    blogPages: { ...blogPagesObj, ...blogBPagesObj },
    blogPageSlugInfo: blogPageSlugInfo,
  };
};

const getArticlePages = async () => {
  const blogPageSlugInfo = await Sanity.blog.getSlugInfo({
    generateStaticData: true,
  });
  const sanitizedArticlePageSlugInfo =
    Sanity.blog.getSlugParams(blogPageSlugInfo);
  const articlePages = await Promise.all(
    sanitizedArticlePageSlugInfo.map(async ({ blogSlug, articleSlug }) => {
      const articlePage = await await Sanity.blog.getArticle(
        blogSlug,
        articleSlug,
        { generateStaticData: true },
      );
      return { blogSlug, articleSlug, articlePage };
    }),
  );
  const articlePagesObj = articlePages.reduce(
    (
      articlePageObj: {
        [blogSlug: string]: { [articleSlug: string]: BlogArticle | null };
      },
      articlePage,
    ) => {
      const articleSlug = articlePage?.articleSlug;
      const blogSlug = articlePage?.blogSlug;

      if (articleSlug && blogSlug) {
        if (articlePageObj[blogSlug]) {
          articlePageObj[blogSlug][articleSlug] = articlePage.articlePage;
        } else {
          articlePageObj[blogSlug] = {
            [articleSlug]: articlePage.articlePage,
          };
        }
      }
      return articlePageObj;
    },
    {},
  );

  const articleBPages = await Promise.all(
    sanitizedArticlePageSlugInfo.map(async ({ blogSlug, articleSlug }) => {
      const articleBPage = await Sanity.blog.getArticle(blogSlug, articleSlug, {
        preferBContent: true,
        generateStaticData: true,
      });
      return { articleBPage, blogSlug, articleSlug };
    }),
  );

  const articleABPagesObj = articleBPages.reduce(
    (
      articlePageObj: {
        [blogSlug: string]: { [articleSlug: string]: BlogArticle | null };
      },
      articleBPage,
    ) => {
      const blogSlug = articleBPage?.blogSlug;
      const articleSlug = articleBPage?.articleBPage?.slug.current;
      if (articleSlug && blogSlug) {
        if (articlePageObj[blogSlug]) {
          articlePageObj[blogSlug][articleSlug] = articleBPage.articleBPage;
        } else {
          articlePageObj[blogSlug] = {
            [articleSlug]: articleBPage.articleBPage,
          };
        }
      }
      return articlePageObj;
    },
    articlePagesObj,
  );

  return {
    articlePages: { ...articleABPagesObj },
  };
};

const getProviderPages = async () => {
  const providerPageSlugInfo = await Sanity.providerPage.getSlugInfo({
    generateStaticData: true,
  });
  const providerPages = await Promise.all(
    providerPageSlugInfo.map(
      async ({ slug }) =>
        await Sanity.providerPage.get(slug.current, {
          generateStaticData: true,
        }),
    ),
  );
  const providerPagesObj = providerPages.reduce(
    (pageObj: { [slug: string]: Practitioner }, page) => {
      if (page?.slug.current) {
        pageObj[page.slug.current] = page;
      }
      return pageObj;
    },
    {},
  );

  const providerBPages = await Promise.all(
    providerPageSlugInfo.map(
      async ({ slug }) =>
        await Sanity.providerPage.get(slug.current, {
          preferBContent: true,
          generateStaticData: true,
        }),
    ),
  );
  const providerBPagesObj = providerBPages.reduce(
    (pageObj: { [slug: string]: Practitioner }, page) => {
      if (page?.slug.current) {
        pageObj[page.slug.current] = page;
      }
      return pageObj;
    },
    {},
  );

  return {
    providerPages: { ...providerPagesObj, ...providerBPagesObj },
    providerPageSlugInfo: providerPageSlugInfo,
  };
};

const main = async () => {
  let siteData: {
    siteSettings?: SiteSettings;
    homePage?: Homepage;
    homeBPage?: Homepage;
    blogPageSlugInfo?: BlogWithArticles[];
    blogPages?: { [slug: string]: Blog };
    articlePages?: {
      [blogSlug: string]: { [articleSlug: string]: BlogArticle | null };
    };
    genericPageSlugInfo?: GenericPageSlugInfo;
    genericPages?: { [slug: string]: GenericPage };
    genericSubPages?: {
      [pageSlug: string]: { [subpageSlug: string]: SubPage | null };
    };
    contactPage?: ContactPage | null;
    contactBPage?: ContactPage | null;
    downloadPage?: DownloadPage | null;
    downloadBPage?: DownloadPage | null;
    notFoundPage?: NotFoundPage | null;
    faqPage?: FAQPage | null;
    clientPageSlugInfo?: GenericPageSlugInfo;
    clientPages?: { [slug: string]: ClientPage };
    providerPageSlugInfo?: GenericPageSlugInfo;
    providerPages?: { [slug: string]: Practitioner };
  } = {};
  //global site data
  const siteSettings = await Sanity.siteSettings.get({
    generateStaticData: true,
  });

  // homepage & special page data
  const homeAndSpecialPageData = await getHomeAndSpecialPages();

  // generic page data
  const genericPageData = await getGenericPages();

  // generic subpage data
  const genericSubPageData = await getGenericSubPages();

  // client page data
  const clientPageData = await getClientPages();

  // blog page data
  const blogPageData = await getBlogPages();

  // article page data
  const articlePageData = await getArticlePages();

  //provider page data
  const providerPageData = await getProviderPages();

  siteData = {
    ...siteData,
    siteSettings,
    ...homeAndSpecialPageData,
    ...genericPageData,
    ...genericSubPageData,
    ...clientPageData,
    ...blogPageData,
    ...articlePageData,
    ...providerPageData,
  };

  // write to file
  const fileContents = await prettier.format(JSON.stringify(siteData, null), {
    parser: 'json',
  });

  fs.writeFileSync(jsonFilePath, fileContents, 'utf8');
  console.log('Site data fetched');
};

main();
