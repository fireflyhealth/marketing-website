import { WorkspaceOptions, defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { documentInternationalization } from '@sanity/document-internationalization';
import { schemaTypes } from './schemas';
import { structure, defaultDocumentNode } from './schemas/structure';
import './lib/styles.css';

const isDevEnv = Boolean(process.env.SANITY_STUDIO_IS_DEVELOPMENT);

const shared = {
  projectId: 'xgbrv2vi',
  plugins: [
    // @ts-ignore
    deskTool({ structure, defaultDocumentNode }),
    visionTool(),

    // Document Internalization is not available yet.
    // Uncomment the 'documentInternationalization' plugin to allow translations.
    // Documentation: https://github.com/sanity-io/document-internationalization
    // documentInternationalization({
    //   supportedLanguages: [{ id: 'en', title: 'English' }],
    //   schemaTypes: [
    //     'homepage',
    //     'genericPage',
    //     'blog',
    //     'blogArticle',
    //     'clientPage',
    //     'downloadPage',
    //     'contactPage',
    //     'notFoundPage',
    //     'faqPage',
    //   ],
    // }),
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
