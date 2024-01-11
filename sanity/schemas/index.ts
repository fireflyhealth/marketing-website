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
import { BlogArticle } from './documents/blogArticle';
import { Blog } from './documents/blog';

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
  Blog,
  BlogArticle,

  /* Field Types */
  SEO,
];
