import { StructureBuilder, StructureResolver } from 'sanity/desk';
import { ComponentType, ReactNode } from 'react';

import { icons } from '../lib/icons';
import { API_VERSION } from '../lib/constants';

type CreateSingletonPageConfig = {
  title: string;
  id: string;
  schemaType: string;
  icon?: ComponentType | ReactNode;
};

const createSingletonPage = (
  S: StructureBuilder,
  { title, schemaType, id, icon }: CreateSingletonPageConfig,
) =>
  S.listItem()
    .title(title)
    .icon(icon || null)
    .child(S.editor().id(id).schemaType(schemaType).id(id).title(title));

export const structure: StructureResolver = async (S, context) => {
  const client = context.getClient({ apiVersion: API_VERSION });
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
    .items([
      createSingletonPage(S, {
        title: 'Site Settings & Navigation',
        id: 'siteSettings',
        schemaType: 'siteSettings',
        icon: icons.Settings,
      }),
      createSingletonPage(S, {
        title: 'Homepage',
        id: 'homepage',
        schemaType: 'homepage',
        icon: icons.Home,
      }),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(icons.Page)
        .child(
          S.documentTypeList('genericPage').filter(
            '_type == "genericPage" && language == "en"',
          ),
        ),
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
      S.divider(),
      S.listItem()
        .title('Clients')
        .icon(icons.Client)
        .child(S.documentTypeList('clientPage')),
      S.divider(),
      S.listItem()
        .title('Blogs')
        .icon(icons.Blog)
        .child(S.documentTypeList('blog')),
      S.listItem()
        .title('Articles')
        .icon(icons.Blog)
        .child(S.documentTypeList('blogArticle')),
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
    ]);
};
