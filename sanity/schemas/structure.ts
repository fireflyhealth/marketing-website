import { StructureResolver } from 'sanity/desk';

import { icons } from '../lib/icons';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Homepage').icon(icons.Home).child(
        S.editor()
          .id('homepage')
          .schemaType('homepage')
          .documentId('homepage')
          .title('Homepage'),
        // TODO: Add Homepage preview
        // .views([
        //   S.view.form(),
        //   S.view.component(Components.PagePreview).title('Preview'),
        // ]),
      ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(icons.Page)
        .child(S.documentTypeList('genericPage')),
    ]);
