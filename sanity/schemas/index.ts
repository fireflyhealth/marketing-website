/* Documents */
import { Homepage } from './documents/homepage';
import { GenericPage, SubPage } from './documents/genericPage';
import {
  ContactPage,
  DownloadPage,
  NotFoundPage,
} from './documents/specialPages';
import { ClientPage } from './documents/clientPage';
import { BlogArticle } from './documents/blogArticle';
import { Blog, BlogArticleTagGroup } from './documents/blog';
import { MockData } from './documents/mockData';
import { SiteSettings } from './documents/siteSettings';
import { Practitioner } from './documents/practitioner';
import { Navigation } from './documents/navigation';
import { FrequentlyAskedQuestion } from './documents/faq';
import { FAQPage } from './documents/faqPage';
import { FAQSubject } from './documents/faqSubject';
import { FAQCategory } from './documents/faqCategory';
import { BlogArticleTag } from './documents/blogArticleTag';

/* Headers */
import { VideoHeader } from './headers/videoHeader';
import { TextHeader } from './headers/textHeader';
import { TextWithDualCtaHeader } from './headers/textWithDualCtaHeader';
import { SimpleTextHeader } from './headers/simpleTextHeader';
import { TwoUpHeaderBlock } from './headers/twoUpHeader';

/* Child Blocks */

import { RichTextChildBlock } from './childBlocks/richTextChildBlock';
import { ImageChildBlock } from './childBlocks/imageChildBlock';

/* Content Blocks */
import { ContentBlockHeader } from './blocks/contentBlockHeader';
import { ImageBlock } from './blocks/imageBlock';
import { ImageCarouselBlock } from './blocks/imageCarouselBlock';
import { DoubleCtaBlock } from './blocks/doubleCtaBlock';
import { ImageTextOverlapBlock } from './blocks/imageTextOverlapBlock';
import { QuoteBlock } from './blocks/quoteBlock';
import { PractitionersBlock } from './blocks/practitionersBlock';
import { TwoUpBlock, TwoUpObject } from './blocks/twoUpBlock';
import {
  SequenceBlock,
  SequenceBlockTextFields,
  SequenceItem,
} from './blocks/sequenceBlock';
import { ReviewBlock, ReviewItem, ReviewHeading } from './blocks/reviewBlock';
import { ImageGridBlock } from './blocks/imageGridBlock';
import { CardListBlock } from './blocks/cardListBlock';
import { TabsBlock, TabsBlockTab } from './blocks/tabsBlock';
import { TestimonialBlock } from './blocks/testimonalBlock';
import { DividerBlock } from './blocks/dividerBlock';

/* Fields */
import { Metadata } from './fields/metadata';
import {
  ResponsiveImageSet,
  RichImage,
  RichImageWithCaption,
} from './fields/images';
import { Link, LinkableDocument } from './fields/linking';
import { CTA } from './fields/cta';
import {
  SimpleRichText,
  ArticleRichText,
  LimitedRichText,
  ContentBlockRichText,
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
import { OverlapDoubleImages } from './fields/overlapDoubleImages';
import { Quote } from './fields/quote';
import { QrCode } from './fields/qrCode';
import { BigNumber, BigNumbers } from './fields/bigNumbers';
import { DrawerListBlock, DrawerListItem } from './blocks/drawerListBlock';
import { RichTextBlock } from './blocks/richTextBlock';
import { Theme } from './fields/theme';
import { RichTextCtaRow } from './fields/richTextCtaRow';
import { QuoteChildBlock } from './childBlocks/quoteChildBlock';
import { VideoChildBlock } from './childBlocks/videoChildBlock';
import { HeaderContentChildBlock } from './childBlocks/headerContentChildBlock';
import { HeaderQrCodeChildBlock } from './childBlocks/headerQrCodeChildBlock';
import { FAQBlock } from './blocks/faqBlock';
import { FeaturedStoriesBlock } from './blocks/featuredStoriesBlock';
import { Icon } from './fields/icon';
import { ColumnsBlock, ColumnsObject } from './blocks/columnsBlock';
import { BigOrderedList } from './fields/bigOrderedList';
import { BlogArticleTag } from './documents/blogArticleTag';
import { CtaCard } from './fields/ctaCard';

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
  BlogArticleTag,
  SiteSettings,
  MockData,
  Navigation,
  Practitioner,
  FrequentlyAskedQuestion,
  FAQSubject,
  FAQCategory,

  /* Header Blocks */
  HeaderArea,
  VideoHeader,
  TextHeader,
  TextWithDualCtaHeader,
  SimpleTextHeader,
  TwoUpHeaderBlock,

  /* Default Blocks (used within ContentArea, each has a heading) */
  ImageBlock,
  ImageCarouselBlock,
  DoubleCtaBlock,
  PractitionersBlock,
  ImageTextOverlapBlock,
  QuoteBlock,
  DrawerListBlock,
  DrawerListItem,
  TwoUpBlock,
  SequenceBlock,
  ReviewBlock,
  ImageGridBlock,
  FAQBlock,
  CardListBlock,
  ColumnsBlock,
  RichTextBlock,
  TabsBlock,
  TabsBlockTab,
  TestimonialBlock,
  /* Divider block does not have heading */
  DividerBlock,

  /* Child blocks (used within other blocks, i.e. 2-up block) */
  CtaCard,
  ChildContentBlock,
  RichTextChildBlock,
  QuoteChildBlock,
  ImageChildBlock,
  FeaturedStoriesBlock,
  VideoChildBlock,
  HeaderContentChildBlock,
  HeaderQrCodeChildBlock,

  /* Child blocks (used within Tabs) */
  TwoUpObject,
  ColumnsObject,

  /* Field Types */
  ContentBlockHeader,
  Metadata,
  RichImage,
  RichImageWithCaption,
  ResponsiveImageSet,
  Link,
  LinkableDocument,
  CTA,
  SimpleRichText,
  LimitedRichText,
  ContentBlockRichText,
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
  OverlapDoubleImages,
  Quote,
  QrCode,
  Theme,
  RichTextCtaRow,
  SequenceBlockTextFields,
  SequenceItem,
  ReviewHeading,
  ReviewItem,
  Icon,
  BlogArticleTagGroup,
  BigOrderedList,
];
