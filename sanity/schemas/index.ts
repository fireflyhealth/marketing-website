import { Homepage } from './documents/homepage';
import { GenericPage, SubPage } from './documents/genericPage';
import { SEO } from './fields/seo';
import {
  ContactPage,
  DownloadPage,
  FAQPage,
  NotFoundPage,
  PressKitPage,
} from './documents/specialPages';
import { ClientPage } from './documents/clientPage';

export const schemaTypes = [
  /* Document Types */
  Homepage,
  GenericPage,
  SubPage,
  DownloadPage,
  ContactPage,
  NotFoundPage,
  FAQPage,
  PressKitPage,
  ClientPage,

  /* Field Types */
  SEO,
];
