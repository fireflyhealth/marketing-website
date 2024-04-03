import { config } from './src/config';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: config.metadata.productionUrl,
  generateRobotsTxt: true,
};
