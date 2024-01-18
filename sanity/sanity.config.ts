import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';
import { schemaTypes } from './schemas';
import { structure } from './schemas/structure';
import './lib/styles.css';

const config = defineConfig({
  name: 'default',
  title: 'Firefly',

  projectId: 'xgbrv2vi',
  dataset: 'production',

  plugins: [
    deskTool({ structure }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [{ id: 'en', title: 'English' }],
      schemaTypes: [
        'homepage',
        'genericPage',
        'blog',
        'blogArticle',
        'clientPage',
        'downloadPage',
        'contactPage',
        'notFoundPage',
        'faqPage',
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});

export default config;
