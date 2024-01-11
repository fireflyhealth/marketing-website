import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './schemas/structure';

const config = defineConfig({
  name: 'default',
  title: 'Firefly',

  projectId: 'xgbrv2vi',
  dataset: 'production',

  plugins: [deskTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});

export default config;
