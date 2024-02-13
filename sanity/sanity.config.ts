import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { schemaTypes } from './schemas';
import { structure, defaultDocumentNode } from './schemas/structure';
import './lib/styles.css';

const config = defineConfig({
  name: 'default',
  title: 'Firefly',

  projectId: 'xgbrv2vi',
  dataset: 'production',

  plugins: [
    // @ts-ignore
    deskTool({ structure, defaultDocumentNode }),
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
    simplerColorInput({
      defaultColorFormat: 'hex',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});

export default config;
