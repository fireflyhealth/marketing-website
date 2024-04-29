/* Documents */
import { Homepage } from './documents/homepage';
import { Deploy } from './documents/deploy';
import { GenericPage, SubPage } from './documents/genericPage';
import {
  ContactPage,
  DownloadPage,
  NotFoundPage,
  ProviderPageSettings,
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
import { RoleDescription } from './documents/roleDescription';

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
import { SmallImageCarouselBlock } from './blocks/smallImageCarouselBlock';
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
import { VideoBlock } from './blocks/videoBlock';
import { ProviderPhilosophyBlock } from './blocks/providerPhilosophyBlock';
import { NearbyBlock } from './blocks/nearbyBlock';

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
  SimpleRichTextWithImage,
  SimpleRichTextWithoutLink,
  ArticleRichText,
  LimitedRichText,
  ContentBlockRichText,
} from './fields/richText';
import { LinkWithLabel } from './fields/linkWithLabel';
import { LabelWithDropdown } from './fields/labelWithDropdown';
import {
  ChildContentBlock,
  ContentArea,
  ProviderPageContentArea,
} from './fields/contentArea';
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
import { Footnotes } from './fields/footnotes';

export const schemaTypes = [
  /* Document Types */
  Homepage,
  Deploy,
  GenericPage,
  SubPage,
  DownloadPage,
  ContactPage,
  NotFoundPage,
  ProviderPageSettings,
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
  RoleDescription,

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
  SmallImageCarouselBlock,
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
  NearbyBlock,
  /* Divider block does not have heading */
  DividerBlock,
  VideoBlock,
  ProviderPhilosophyBlock,

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
  SimpleRichTextWithImage,
  SimpleRichTextWithoutLink,
  LimitedRichText,
  ContentBlockRichText,
  ArticleRichText,
  LinkWithLabel,
  LabelWithDropdown,
  ContentArea,
  ProviderPageContentArea,
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
  Footnotes,
];
