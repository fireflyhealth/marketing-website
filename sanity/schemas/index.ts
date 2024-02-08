import { Homepage } from './documents/homepage';
import { GenericPage, SubPage } from './documents/genericPage';
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

import { Metadata } from './fields/metadata';
import { RichImage } from './fields/images';
import { Link, LinkableDocument } from './fields/linking';
import { CTA } from './fields/cta';
import { SimpleRichText, ArticleRichText } from './fields/richText';
import { Navigation } from './documents/navigation';
import { LinkWithLabel } from './fields/linkWithLabel';
import { LabelWithDropdown } from './fields/labelWithDropdown';
import { ContentArea } from './fields/contentArea';
import { NavigationOverrides } from './fields/navigationOverrides';
import { AnnouncementBanner } from './fields/announcementBanner';
import { Video } from './fields/video';
import { HubspotForm } from './fields/hubSpotForm';
import { VideoHeader } from './blocks/videoHeader';
import { HeaderArea } from './fields/headerArea';

import { ContentBlockHeader } from './blocks/contentBlockHeader';
import { ImageBlock } from './blocks/imageBlock';
import { ImageCarouselBlock } from './blocks/imageCarouselBlock';

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

  /* Header Blocks */
  HeaderArea,
  VideoHeader,

  /* Blocks */
  ImageBlock,
  ImageCarouselBlock,

  /* Field Types */
  ContentBlockHeader,
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
  Video,
  HubspotForm,
];
