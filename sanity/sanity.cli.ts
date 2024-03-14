import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    /* TODO: remove this one and uncomment with the (actual) project
     * when billing is set up on Firefly's side. */
    projectId: '1k6agrlr',
    // projectId: 'xgbrv2vi',
    dataset: 'production',
  },
});
