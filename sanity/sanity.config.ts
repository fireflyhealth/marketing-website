import { WorkspaceOptions, defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
// Document Internationalization is not available yet.
// Uncomment the 'documentInternationalization' import to allow translations.
// Documentation: https://github.com/sanity-io/document-internationalization
// import { documentInternationalization } from '@sanity/document-internationalization';
import { schemaTypes } from './schemas';
import { structure, defaultDocumentNode } from './schemas/structure';
import './lib/styles.css';
import { PREVIEW_BASE_URL } from './lib/config';
import PagePreview, {
  SECRETS_NAMESPACE,
  SANITY_PREVIEW_TOKEN_KEY,
  SECRETS_KEYS,
  getTypeSegment,
} from './lib/pagePreview';

const isDevEnv = Boolean(process.env.SANITY_STUDIO_IS_DEVELOPMENT);

const SanitySecret = () => {
  const { secrets } = useSecrets<{
    [SANITY_PREVIEW_TOKEN_KEY]: string;
  }>(SECRETS_NAMESPACE);

  return secrets;
};

const shared = {
  projectId: 'xgbrv2vi',
  plugins: [
    // @ts-ignore
    structureTool({ structure, defaultDocumentNode }),
    visionTool(),

    // Document Internationalization is not available yet.
    // Uncomment the 'documentInternationalization' plugin to allow translations.
    // Documentation: https://github.com/sanity-io/document-internationalization
    // documentInternationalization({
    //   supportedLanguages: [{ id: 'es', title: 'Spanish' }],
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
  document: {
    productionUrl: async (_, context) => {
      const { document } = context;

      if (
        document._type == 'siteSettings' ||
        document._type == 'navigation' ||
        document._type == 'faq' ||
        document._type == 'faqCategory' ||
        document._type == 'faqSubject' ||
        document._type == 'blogArticleTag' ||
        document._type == 'mockData'
      )
        return;

      let src = `${PREVIEW_BASE_URL}/${getTypeSegment(document._type)}`;

      if (
        document._type !== 'homepage' &&
        document._type !== 'downloadPage' &&
        document._type !== 'contactPage' &&
        document._type !== 'notFoundPage' &&
        document._type !== 'faqPage'
      )
        src += `/${document._id}`;

      return src;
    },
  },
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
