import {
  DefaultDocumentNodeResolver,
  StructureBuilder,
  StructureResolver,
} from 'sanity/structure';
import { ComponentType, ReactNode } from 'react';

import { icons } from '../lib/icons';
import { API_VERSION } from '../lib/constants';

import PagePreview from '../lib/pagePreview';
import { addProductionDataWarning } from '../lib/warnForProduction';

const isDevelopment: boolean =
  typeof window !== 'undefined' && window.location.hostname === 'localhost';

/**
 * Builder utils
 */
type CreateSingletonPageConfig = {
  title: string;
  id: string;
  schemaType: string;
  icon?: ComponentType | ReactNode;
};

/* Create a singleton page entry */
const createSingletonPage = (
  S: StructureBuilder,
  { title, schemaType, id, icon }: CreateSingletonPageConfig,
) =>
  S.listItem()
    .title(title)
    .icon(icon || null)
    .child(
      S.editor()
        .id(id)
        .schemaType(schemaType)
        .id(id)
        .title(title)
        .views([S.view.form(), S.view.component(PagePreview).title('Preview')]),
    );

type CreateDocumentTypeListConfig = {
  schemaType: string;
  title: string;
  icon?: React.ReactNode | React.ComponentType;
};
/* Create a documentTypeList with default filters */
const createFilteredDocumentTypeList = (
  S: StructureBuilder,
  { schemaType, title, icon }: CreateDocumentTypeListConfig,
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentTypeList(schemaType)
        .filter(
          /* Filter out documents that are a variant of another */
          `_type == $schemaType
           && !defined(documentVariantInfo.variantOf)`,
        )
        .params({ schemaType }),
    );

export const structure: StructureResolver = async (S, context) => {
  const client = context.getClient({ apiVersion: API_VERSION });
  /**
   * Adds a warning to developers when they are modifying the production dataset
   * outside of the production URL
   */

  addProductionDataWarning(context);
  /* BUG: orphan articles do not disappear from the list after
   * they have been assigned a category (the studio needs a refresh) */
  const [orphanSubpages, orphanArticles] = await Promise.all([
    client.fetch(`
      *[
        _type == "subPage"
        && !(_id in path('drafts.**'))
      ]{
        _id,
        "parentPages": *[
          _type == "genericPage"
          && ^._id in subPages[]._ref
        ]
      }[count(parentPages) < 1]
    `),
    client.fetch(`
     *[
        _type == "blogArticle"
        && !(_id in path('drafts.**'))
      ]{
        _id,
        category
      }[!defined(category)]
    `),
  ]);
  const orphanSubpageIds = orphanSubpages.map((page) => page._id);
  const orphanArticleIds = orphanArticles.map((article) => article._id);
  return S.list()
    .title('Content')
    .items(
      [
        createSingletonPage(S, {
          title: 'Site Settings & Navigation',
          id: 'siteSettings',
          schemaType: 'siteSettings',
          icon: icons.Settings,
        }),
        S.listItem()
          .title('Navigation')
          .icon(icons.Navigation)
          .child(S.documentTypeList('navigation')),
        createSingletonPage(S, {
          title: 'Homepage',
          id: 'homepage',
          schemaType: 'homepage',
          icon: icons.Home,
        }),

        S.divider(),

        createFilteredDocumentTypeList(S, {
          title: 'Pages',
          schemaType: 'genericPage',
          icon: icons.Page,
        }),
        S.listItem()
          .title('Special Pages')
          .icon(icons.Page)
          .child(
            S.list()
              .title('Special Pages')
              .items([
                createSingletonPage(S, {
                  title: 'Download Page',
                  id: 'downloadPage',
                  schemaType: 'downloadPage',
                  icon: icons.Download,
                }),
                createSingletonPage(S, {
                  title: 'Contact Page',
                  id: 'contactPage',
                  schemaType: 'contactPage',
                  icon: icons.Contact,
                }),
                createSingletonPage(S, {
                  title: '404 Page',
                  id: 'notFoundPage',
                  schemaType: 'notFoundPage',
                  icon: icons.NotFound,
                }),
              ]),
          ),

        S.divider(),

        createSingletonPage(S, {
          title: 'FAQ Page',
          id: 'faqPage',
          schemaType: 'faqPage',
          icon: icons.Question,
        }),
        S.listItem()
          .title('Frequently Asked Questions')
          .icon(icons.Question)
          .child(S.documentTypeList('faq')),
        S.listItem()
          .title('FAQ Categories')
          .icon(icons.Question)
          .child(S.documentTypeList('faqCategory')),
        S.listItem()
          .title('FAQ Subjects')
          .icon(icons.Question)
          .child(S.documentTypeList('faqSubject')),

        S.divider(),

        createFilteredDocumentTypeList(S, {
          title: 'Clients',
          schemaType: 'clientPage',
          icon: icons.Client,
        }),
        createFilteredDocumentTypeList(S, {
          title: 'Practitioners',
          schemaType: 'practitioner',
          icon: icons.Practitioner,
        }),

        S.divider(),

        createFilteredDocumentTypeList(S, {
          title: 'Blogs',
          schemaType: 'blog',
          icon: icons.Blog,
        }),
        createFilteredDocumentTypeList(S, {
          title: 'Articles',
          schemaType: 'blogArticle',
          icon: icons.Blog,
        }),
        S.listItem()
          .title('Article Tags')
          .icon(icons.Tags)
          .child(S.documentTypeList('blogArticleTag')),

        S.divider(),

        S.listItem()
          .title('Housekeeping')
          .icon(icons.Trash)
          .child(
            S.list()
              .title('Housekeeping')
              .id('housekeeping')
              .items([
                S.listItem()
                  .title('Orphan Articles')
                  .child(
                    S.documentList()
                      .id('orphanArticles')
                      .title('Orphan Articles')
                      .filter(
                        '_type == "blogArticle" && _id in $orphanArticleIds',
                      )
                      .params({ orphanArticleIds }),
                  ),
                S.listItem()
                  .title('Orphan Subpages')
                  .child(
                    S.documentList()
                      .id('orphanSubpages')
                      .title('Orphan Subpages')
                      .filter('_type == "subPage" && _id in $orphanSubpageIds')
                      .params({ orphanSubpageIds }),
                  ),
              ]),
          ),
      ].concat(
        isDevelopment
          ? [
              S.divider(),
              createSingletonPage(S, {
                title: 'Mock Data',
                id: 'mockData',
                schemaType: 'mockData',
                icon: icons.Code,
              }),
            ]
          : [],
      ),
    );
};

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  if (
    [
      'genericPage',
      'clientPage',
      'blog',
      'blogArticle',
      'subPage',
      'practitioner',
    ].includes(schemaType)
  ) {
    return S.document().views([
      S.view.form(),
      S.view.component(PagePreview).title('Preview'),
    ]);
  }

  return S.document().views([S.view.form()]);
};
