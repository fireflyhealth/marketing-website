import { defineType } from 'sanity';
import { themeOptions } from '../../lib/constants';

export const Theme = defineType({
  name: 'theme',
  title: 'Theme',
  type: 'string',
  options: {
    list: themeOptions,
  },
});
