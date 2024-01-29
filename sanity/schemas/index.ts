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
import { MockData } from './documents/mockData';
import { SiteSettings } from './documents/siteSettings';
import { RichImage } from './fields/images';
import { Link, LinkableDocument } from './fields/linking';
import { CTA } from './fields/cta';
import { SimpleRichText, ArticleRichText } from './fields/richText';
import { Navigation } from './documents/navigation';
import { LinkWithLabel } from './fields/linkWithLabel';
import { LabelWithDropdown } from './fields/labelWithDropdown';
import { ContentArea } from './fields/contentArea';
import { HeaderBlock } from './blocks/headerBlock';
import { NavigationOverrides } from './fields/navigationOverrdies';
import { AnnouncementBanner } from './fields/announcementBanner';

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
  SiteSettings,
  MockData,
  Navigation,

  /* Blocks */
  HeaderBlock,

  /* Field Types */
  Metadata,
  RichImage,
  Link,
  LinkableDocument,
  CTA,
  SimpleRichText,
  ArticleRichText,
  LinkWithLabel,
  LabelWithDropdown,
  ContentArea,
  NavigationOverrides,
  AnnouncementBanner,
];
