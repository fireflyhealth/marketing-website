import { StructureBuilder, StructureResolver } from 'sanity/desk';
import { ComponentType, ReactNode } from 'react';

import { icons } from '../lib/icons';

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

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
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
        .child(S.documentTypeList('genericPage')),
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
              createSingletonPage(S, {
                title: 'Press Kit',
                id: 'pressKitPage',
                schemaType: 'pressKitPage',
                icon: icons.Press,
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
    ]);
