import { WorkspaceOptions, defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';
import { schemaTypes } from './schemas';
import { structure, defaultDocumentNode } from './schemas/structure';
import './lib/styles.css';

const isDevEnv = Boolean(process.env.SANITY_STUDIO_IS_DEVELOPMENT);

const shared = {
  /* TODO: remove this one and uncomment with the (actual) project
   * when billing is set up on Firefly's side. */
  projectId: '1k6agrlr',
  // projectId: 'xgbrv2vi',
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
  ],

  schema: {
    types: schemaTypes,
  },
};

const stagingWorkspace: WorkspaceOptions = {
  ...shared,
  title: 'Firefly (Staging)',
  name: 'staging',
  dataset: 'staging',
  basePath: '/staging',
  subtitle: 'Staging',
};

const productionWorkspace: WorkspaceOptions = {
  ...shared,
  title: 'Firefly',
  name: 'production',
  dataset: 'production',
  basePath: '/production',
  subtitle: 'Production',
};

const devConfig = [stagingWorkspace, productionWorkspace];

const prodConfig = [productionWorkspace];

/* Do not expose the staging dataset on the production build */
const config = defineConfig(isDevEnv ? devConfig : prodConfig);

export default config;
