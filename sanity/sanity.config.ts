import { defineConfig } from '@sanity-typed/types';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { structure } from './schemas/structure';

export default defineConfig({
  name: 'default',
  title: 'Firefly',

  projectId: 'xgbrv2vi',
  dataset: 'production',

  plugins: [deskTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
