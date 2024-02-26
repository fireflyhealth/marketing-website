/* Documents */
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
import { Practitioner } from './documents/practitioner';
import { Navigation } from './documents/navigation';

/* Headers */
import { VideoHeader } from './headers/videoHeader';

/* Child Blocks */

import { RichTextChildBlock } from './childBlocks/richTextChildBlock';
import { ImageChildBlock } from './childBlocks/imageChildBlock';

/* Content Blocks */
import { ContentBlockHeader } from './blocks/contentBlockHeader';
import { ImageBlock } from './blocks/imageBlock';
import { ImageCarouselBlock } from './blocks/imageCarouselBlock';
import { CtaCard, CtaCardsBlock } from './blocks/ctaCardsBlock';
import { DoubleCtaBlock } from './blocks/doubleCtaBlock';
import { ImageTextOverlapBlock } from './blocks/imageTextOverlapBlock';
import { QuoteBlock } from './blocks/quoteBlock';
import { PractitionersBlock } from './blocks/practitionersBlock';
import { TwoUpBlock } from './blocks/twoUpBlock';
import {
  SequenceBlock,
  SequenceBlockTextFields,
  SequenceItem,
} from './blocks/sequenceBlock';
import { ReviewBlock, ReviewItem, ReviewHeading } from './blocks/reviewBlock';

/* Fields */
import { Metadata } from './fields/metadata';
import { ResponsiveImageSet, RichImage } from './fields/images';
import { Link, LinkableDocument } from './fields/linking';
import { CTA } from './fields/cta';
import {
  SimpleRichText,
  ArticleRichText,
  LimitedRichText,
} from './fields/richText';
import { LinkWithLabel } from './fields/linkWithLabel';
import { LabelWithDropdown } from './fields/labelWithDropdown';
import { ChildContentBlock, ContentArea } from './fields/contentArea';
import { NavigationOverrides } from './fields/navigationOverrides';
import { AnnouncementBanner } from './fields/announcementBanner';
import { Video } from './fields/video';
import { HubspotForm } from './fields/hubSpotForm';
import { HeaderArea } from './fields/headerArea';
import { BarGraphItems } from './fields/barGraphItems';
import { DoubleCta, LargeCTACard } from './fields/doubleCta';
import { TwoColumnUnorderedList } from './fields/twoColumnUnorderedList';
import { Quote } from './fields/quote';
import { BigNumber, BigNumbers } from './fields/bigNumbers';
import { DrawerListBlock, DrawerListItem } from './blocks/drawerListBlock';
import { Theme } from './fields/theme';
import { RichTextCtaRow } from './fields/richTextCtaRow';
import { QuoteChildBlock } from './childBlocks/quoteChildBlock';

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
  Practitioner,

  /* Header Blocks */
  HeaderArea,
  VideoHeader,

  /* Default Blocks (used within ContentArea, each has a heading) */
  ImageBlock,
  ImageCarouselBlock,
  CtaCardsBlock,
  CtaCard,
  DoubleCtaBlock,
  PractitionersBlock,
  ImageTextOverlapBlock,
  QuoteBlock,
  DrawerListBlock,
  DrawerListItem,
  TwoUpBlock,
  SequenceBlock,
  ReviewBlock,

  /* Child blocks (used within other blocks, i.e. 2-up block) */
  ChildContentBlock,
  RichTextChildBlock,
  QuoteChildBlock,
  ImageChildBlock,

  /* Field Types */
  ContentBlockHeader,
  Metadata,
  RichImage,
  ResponsiveImageSet,
  Link,
  LinkableDocument,
  CTA,
  SimpleRichText,
  LimitedRichText,
  ArticleRichText,
  LinkWithLabel,
  LabelWithDropdown,
  ContentArea,
  NavigationOverrides,
  AnnouncementBanner,
  Video,
  HubspotForm,
  BarGraphItems,
  DoubleCta,
  LargeCTACard,
  BigNumber,
  BigNumbers,
  TwoColumnUnorderedList,
  Quote,
  Theme,
  RichTextCtaRow,
  SequenceBlockTextFields,
  SequenceItem,
  ReviewHeading,
  ReviewItem,
];
