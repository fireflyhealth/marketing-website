import { Homepage } from './documents/homepage';
import { GenericPage, SubPage } from './documents/genericPage';
import { Metadata } from './fields/metadata';
import {
  ContactPage,
  DownloadPage,
  FAQPage,
  NotFoundPage,
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
  ClientPage,
  Blog,
  BlogArticle,

  /* Field Types */
  Metadata,
];
