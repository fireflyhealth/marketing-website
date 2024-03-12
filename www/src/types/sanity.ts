import { PortableTextBlock } from '@portabletext/types';
import { ColorTheme } from '@/components/Theme';
import { IconTypeName } from '@/svgs/BrandedIcon';

/**
 * Generic
 */

export type WithChildren<T = {}> = T & {
  children: React.ReactNode;
};

export type Maybe<T> = T | null | undefined;
/* All sanity "type: array" field children have an additional
 * unique _key prop */
export type Keyed<T> = T & { _key: string };
export type KeyedArray<T> = Array<Keyed<T>>;

export type DocumentReference = {
  _type: 'reference';
  _ref: string;
  _weak?: boolean;
};

interface SanityDocument {
  _id: string;
  _type: string;
  /* These are required but we don't always fetch them */
  _createdAt?: string;
  _updatedAt?: string;
}

type FileAsset = {
  asset: {
    _type: 'sanity.fileAsset';
    _id: string;
    url: string;
    originalFilename: string;
    extension: string;
    size: number;
  };
};

/**
 * Linkable Documents
 */

/* Are you updating this union? There are a number of other things
 * you will need to update. See corresponding instructions in
 * cms/schemas/constants/linkableDocuments.ts */
export type LinkableDocument =
  | Homepage
  | DownloadPage
  | ContactPage
  | FAQPage
  | GenericPage
  | SubPage
  | Blog
  | BlogArticle
  | ClientPage
  | Practitioner;

export type LinkableDocumentData =
  | HomepageLinkData
  | DownloadPageLinkData
  | ContactPageLinkData
  | FAQPageLinkData
  | GenericPageLinkData
  | SubPageLinkData
  | BlogLinkData
  | BlogArticleLinkData
  | ClientPageLinkData
  | PractitionerLinkData;

/**
 * Documents
 */

/* Fields included in both generic pages and
 * special pages. (I.e. this does not include 'subnav',
 * that does not exist on the FAQ page) */
export type PageShared = {
  navigationOverrides?: Maybe<NavigationOverrides>;
  header: HeaderArea;
  metadata?: Maybe<Metadata>;
};

export type Navigation = SanityDocument & {
  _type: 'navigation';
  navGroup: KeyedArray<NavGroupType>;
  showNavCTA: boolean;
};

export type NavigationExample = {
  globalNav: Navigation;
  doubleCta: DoubleCta;
};

export type SubnavItem = {
  contentBlockId: string;
  label: string;
  ariaLabel: Maybe<string>;
};

export type SiteSettings = SanityDocument & {
  _type: 'siteSettings';
  globalNav: Navigation;
  globalAnnouncementBanner: AnnouncementBanner;
  globalDoubleCta: DoubleCta;
  defaultMetadata: Metadata;
  footer: Footer;
};

export type Homepage = SanityDocument &
  PageShared & {
    _type: 'homepage';
    subnav: Maybe<boolean>;
    content: ContentArea;
  };
export type HomepageLinkData = Pick<Homepage, '_type'>;

/* Special pages */
export type DownloadPage = SanityDocument &
  PageShared & {
    _type: 'downloadPage';
    title: string;
    content: ContentArea;
  };
export type DownloadPageLinkData = Pick<DownloadPage, '_type'>;

export type ContactPage = SanityDocument &
  PageShared & {
    _type: 'contactPage';
    title: string;
    navigationOverrides?: NavigationOverrides;
    pageTitle: string;
    pageDescription: SimpleRichText;
    contactForm: {
      formId: string;
    };
    backgroundColor: Maybe<string>;
    backgroundImage: Maybe<RichImage>;
    metadata?: Metadata;
  };
export type ContactPageLinkData = Pick<ContactPage, '_type'>;

export type NotFoundPage = SanityDocument &
  PageShared & {
    _type: 'notFoundPage';
    title: string;
    content: ContentArea;
    decorativeImage: ResponsiveImageSet;
  };

export type FAQPage = SanityDocument &
  PageShared & {
    _type: 'faqPage';
    title: string;
    /* Note: these are not in the schema but are fetched in the
     * query */
    faqs: FAQ[];
  };

export type FAQPageLinkData = Pick<FAQPage, '_type'>;

export type FAQSubject = SanityDocument & {
  title: string;
  slug: Slug;
};
export type FAQCategory = SanityDocument & {
  title: string;
  slug: Slug;
};

export type FAQ = SanityDocument & {
  _type: 'faq';
  subject: FAQSubject;
  category: FAQCategory;
  question: string;
  answer: SimpleRichText;
};

/* Properties common to both GenericPage & SubPage */
type GenericPageShared = SanityDocument &
  PageShared & {
    title: string;
    content: ContentArea;
    subnav: Maybe<boolean>;
    slug: Slug;
  };

export type GenericPage = GenericPageShared & {
  _type: 'genericPage';
  subPages?: KeyedArray<SubPage>;
};
export type GenericPageLinkData = Pick<GenericPage, '_type' | 'slug' | 'title'>;

export type SubPage = GenericPageShared & {
  _type: 'subPage';
  parentPage: GenericPageLinkData;
};

export type SubPageLinkData = Pick<
  SubPage,
  '_type' | 'slug' | 'title' | 'parentPage'
>;

/* Client Page */
export type ClientPage = SanityDocument &
  PageShared & {
    _type: 'clientPage';
    clientName: string;
    slug: Slug;
    subnav: Maybe<boolean>;
    content: ContentArea;
  };
export type ClientPageLinkData = Pick<
  ClientPage,
  '_type' | 'slug' | 'clientName'
>;

/* Practitioners */
export type Institution = {
  _type: 'institution';
  /* i.e. "Harvard Medical School" */
  name: string;
};

export type Practitioner = SanityDocument & {
  _type: 'practitioner';
  name: string;
  slug: Slug;
  /* i.e. "Nurse Practitioner" */
  title: string;
  /* i.e. "PsyD, MSW" */
  qualifications: Maybe<string>;
  pronouns: string;
  headshot: Maybe<RichImage>;
  education: KeyedArray<Institution>;
  languagesSpoken: string[];
  blurb: RichText;
};

/* Data needed to render practitioner profile cards */
export type PractitionerLinkData = Pick<
  Practitioner,
  | '_id'
  | '_type'
  | 'name'
  | 'slug'
  | 'qualifications'
  | 'headshot'
  | 'blurb'
  | 'pronouns'
  | 'title'
>;

/* Blogs */
export type Blog = SanityDocument & {
  _type: 'blog';
  title: string;
  slug: Slug;
  metadata?: Metadata;
  navigationOverrides?: NavigationOverrides;
  header: HeaderArea;
  /* Not part of the schema, but fetched in the query */
  articles: BlogArticle[];
  featuredArticle: Maybe<BlogArticle>;
  contentArea: Maybe<ContentArea>;
  allArticlesLabel: string;
  blogArticleTagGroups: Maybe<KeyedArray<BlogArticleTagGroup>>;
  articleLayout: BlogArticleLayout;
};

export type BlogArticleLayout = 'grid' | 'list';
export type BlogLinkData = Pick<Blog, '_type' | 'slug' | 'title'>;

export type BlogArticleTagGroup = {
  _type: 'blogArticleTagGroup';
  title: string;
  tag: BlogArticleTag;
};

export type BlogArticleTag = SanityDocument & {
  _type: 'blogArticleTag';
  title: string;
  slug: string;
};

export type BlogArticle = SanityDocument & {
  _type: 'blogArticle';
  /* Usually this is typed as optional because we do not fetch
   * the field on most documents, even though this value is always
   * present in sanity documents. It's required here because we use
   * it in rendering the publish date of documents. */
  _updatedAt: string;
  _createdAt: string;
  title: string;
  publishDate: Maybe<string>;
  updatedDate: Maybe<string>;
  articleImage: Maybe<RichImage>;
  authorName: Maybe<string>;
  thumbnail: RichImage;
  slug: Slug;
  navigationOverrides?: NavigationOverrides;
  category: BlogLinkData;
  metadata?: Metadata;
  tags: Maybe<BlogArticleTag[]>;
  blurb: SimpleRichText;
  deck: Maybe<SimpleRichText>;
  content: RichText;
};

export type BlogArticleLinkData = Pick<
  BlogArticle,
  | '_type'
  | 'slug'
  | 'title'
  | 'category'
  | 'thumbnail'
  | 'publishDate'
  | 'blurb'
  | '_updatedAt'
>;

/* Navigation */
export type LinkWithLabel = {
  _type: 'linkWithLabel';
  label: string;
  link: Link | LinkableDocument;
};

export type LabelWithDropdown = {
  _type: 'labelWithDropdown';
  label: string;
  subpages: KeyedArray<LinkWithLabel>;
};

export type NavGroupType = LinkWithLabel | LabelWithDropdown;

export type Footer = {
  mobileCta: CTA;
  footerNavGroups: Maybe<KeyedArray<{ navItems: KeyedArray<LinkWithLabel> }>>;
  bottomLinks: Maybe<{
    leftLinks: Maybe<KeyedArray<LinkWithLabel>>;
    rightLinks: Maybe<KeyedArray<LinkWithLabel>>;
  }>;
};

/*
 * Fields
 */

export type Slug = {
  current: string;
  _type?: 'slug';
};

export type NavigationOverrides = {
  pageNavigation: Maybe<Navigation>;
  announcementBanner: Maybe<AnnouncementBanner>;
};

export type AnnouncementBanner = {
  _type: 'announcementBanner';
  body: Maybe<SimpleRichText>;
};

/* An enhanced image field that includes a caption & required alt text */
export type RichImage = Omit<Image, '_type'> & {
  _type: 'richImage';
  altText: string;
  caption?: Maybe<string>;
};

/* These are all typed as "maybe", but at least one is
 * required in sanity. */
export type ResponsiveImageSet = {
  desktop: Maybe<RichImage>;
  tablet: Maybe<RichImage>;
  mobile: Maybe<RichImage>;
};

export type ColorSwatch = {
  /* Name of the color, i.e. "Midnight" | "Sienna" */
  label: string;
  /* Value is a hex code */
  value: string;
};

export type ImageCrop = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type ImageHotspot = {
  height: number;
  width: number;
  x: number;
  y: number;
};

export type ImageDimensions = {
  aspectRatio: number;
  width: number;
  height: number;
};

export type Image = {
  _type: 'image';
  altText: string;
  crop?: Maybe<ImageCrop>;
  hotspot?: Maybe<ImageHotspot> | null;
  asset: {
    _id: string;
    url: string;
    metadata: {
      lqip: string;
      dimensions: ImageDimensions;
    };
  };
};

export type Video = {
  _type: 'video';
  videoLink: 'string';
  posterImage: RichImage;
};

export type Metadata = {
  title?: string;
  description?: string;
  shareTitle?: string;
  shareDescription?: string;
  shareGraphic?: Image;
};

export type Link = {
  _type: 'link';
  documentLink?: Maybe<LinkableDocumentData>;
  externalUrl?: Maybe<string>;
  file?: Maybe<FileAsset>;
};

export type CTA = {
  _type: 'cta';
  label: string;
  ariaLabel?: Maybe<string>;
  id: string;
  variant: 'primary' | 'secondary' | 'outlined';
  link: Link;
};

/**
 * RichText Blocks
 */

export type RichText = Array<
  | PortableTextBlock
  | BarGraph
  | HubspotForm
  | IconBlock
  | BigNumbers
  | RichTextCtaRow
  | TwoColumnUnorderedList
  | BigOrderedList
  | QuoteObject
  | Video
  | OverlapDoubleImages
>;

export type SimpleRichText = Array<PortableTextBlock>;
export type LimitedRichText = Array<
  PortableTextBlock | BigNumbers | RichTextCtaRow
>;

export type RichTextCtaRow = {
  _type: 'richTextCtaRow';
  ctas: KeyedArray<CTA>;
};

export type HubspotForm = {
  _type: 'form';
  formId: string;
};

export type BarGraph = {
  _type: 'barGraphItems';
  _key: string;
  barOne: {
    unit: number;
    description: string;
  };
  barTwo: {
    unit: number;
    description: string;
  };
};

export type IconBlock = {
  _type: 'icon';
  icon: IconTypeName;
};
export type BigNumber = {
  _type: 'bigNumber';
  unit: Maybe<{
    unitValue: string;
    position: 'before' | 'after';
  }>;
  value: number;
  description: SimpleRichText;
};

export type BigNumbers = {
  _type: 'bigNumbers';
  bigNumbers?: KeyedArray<BigNumber>;
  citation: Maybe<SimpleRichText>;
};

export type TwoColumnUnorderedList = {
  _type: 'twoColumnUnorderedList';
  _key: string;
  listItems: string[];
};

export type BigOrderedList = {
  _type: 'bigOrderedList';
  _key: string;
  listItems: {
    title: string;
    description: Maybe<SimpleRichText>;
  }[];
};
export type OverlapDoubleImages = {
  _type: 'overlapDoubleImages';
  _key: string;
  images: KeyedArray<RichImage>;
};

/**
 * Header Area Block
 */
export type HeaderBlock =
  | VideoHeader
  | TextHeader
  | SimpleTextHeader
  | TextWithDualCtaHeader
  | TwoUpHeader;

export type HeaderArea = HeaderBlock;

export type VideoHeader = {
  _type: 'videoHeader';
  theme?: ColorTheme;
  eyebrow: string;
  heading: string;
  body: SimpleRichText;
  video: Video;
};

export type TextHeader = {
  _type: 'textHeader';
  eyebrow: Maybe<string>;
  heading: string;
  body: Maybe<RichText>;
  theme: ColorTheme;
  ctas: Array<CTA>;
  gradientBackground: boolean;
};

export type TextWithDualCtaHeaderCta = {
  image: ResponsiveImageSet;
  eyebrow: Maybe<string>;
  label: string;
  link: Link;
  ariaLabel: Maybe<string>;
  theme: ColorTheme;
};

export type TextWithDualCtaHeader = {
  _type: 'textWithDualCtaHeader';
  eyebrow: Maybe<string>;
  heading: string;
  body: Maybe<RichText>;
  theme: ColorTheme;
  ctas: Array<CTA>;
  topCta: TextWithDualCtaHeaderCta;
  bottomCta: TextWithDualCtaHeaderCta;
};

export type TwoUpHeader = {
  _type: 'twoUpHeader';
  layout: 'normal-50-50' | 'overlap-50-50';
  mobileReverseBlockOrder: Maybe<boolean>;
  blockOne: ChildContentBlock;
  blockTwo: ChildContentBlock;
  blockThemes: Maybe<{
    blockOneTheme: ColorTheme;
    blockTwoTheme: ColorTheme;
  }>;
};

export type SimpleTextHeader = {
  _type: 'simpleTextHeader';
  heading: string;
  theme: ColorTheme;
};

/**
 * Child Content Blocks
 */

export type ChildContentBlock =
  | RichTextChildBlock
  | ImageChildBlock
  | QuoteChildBlock
  | BigNumbers
  | BigNumber
  | CTACard
  | VideoChildBlock
  | HeaderQrCodeChildBlock
  | HeaderContentChildBlock;

export type QrCodeObject = {
  _type: 'qrCodeObject';
  qrCodeImage: RichImage;
  text: Maybe<string>;
  storeLinks: {
    appStoreLink: Maybe<Link>;
    playStoreLink: Maybe<Link>;
  };
};

export type HeaderQrCodeChildBlock = {
  _type: 'headerQrCodeChildBlock';
  heading: string;
  body: Maybe<SimpleRichText>;
  qrCode: QrCodeObject;
};

export type HeaderContentChildBlock = {
  _type: 'headerContentChildBlock';
  eyebrow: Maybe<string>;
  eyebrowImage: Maybe<RichImage>;
  heading: string;
  body: SimpleRichText;
  cta: Maybe<CTA>;
  size: 'small' | 'large';
};

export type RichTextChildBlock = {
  _type: 'richTextChildBlock';
  _key: string;
  icon: Maybe<IconBlock>;
  image: Maybe<RichImage>;
  heading: Maybe<string>;
  headingFontSize: 'font-size-6' | 'font-size-5' | 'font-size-4';
  alignCenter: Maybe<boolean>;
  body: LimitedRichText;
};

export type ImageChildBlock = {
  _type: 'imageChildBlock';
  image: RichImage;
};

export type VideoChildBlock = {
  _type: 'videoChildBlock';
  video: Video;
};

export type QuoteChildBlock = {
  _type: 'quoteChildBlock';
  quote: QuoteObject;
};

export type DividerBlock = {
  _type: 'dividerBlock';
  borderTop: Maybe<boolean>;
  borderBottom: Maybe<boolean>;
};

/**
 * Content Area Blocks
 */

export type ContentBlock =
  | ImageBlock
  | ImageCarouselBlock
  | CTACardsBlock
  | PractitionersBlock
  | ImageTextOverlapBlock
  | QuoteBlock
  | DoubleCtaBlock
  | DrawerListBlock
  | TwoUpBlock
  | SequenceBlock
  | ReviewBlock
  | ImageGridBlock
  | FAQBlock
  | CardListBlock
  | FeaturedStoriesBlock
  | ColumnsBlock
  | TabsBlock
  | RichTextBlock
  | TestimonialBlock
  | DividerBlock;

export type ContentArea = KeyedArray<ContentBlock>;

export type ContentBlockHeader = {
  _type: 'contentBlockHeader';
  title?: string;
  description?: Maybe<SimpleRichText>;
  cta?: Maybe<CTA>;
};

type ContentBlockCommon = {
  header: Maybe<ContentBlockHeader>;
  subnav: Maybe<SubnavItem>;
};

export type ImageBlock = {
  _type: 'imageBlock';
  subnav: Maybe<SubnavItem>;
  header: Maybe<ContentBlockHeader>;
  image: RichImage;
};

export type ImageCarouselBlock = ContentBlockCommon & {
  _type: 'imageCarouselBlock';
  images: KeyedArray<RichImage>;
};

export type SequenceBlockTextFields = {
  _type: 'sequenceBlockTextFields';
  title: string;
  bellyButtonText: Maybe<string>;
  description: string;
};

export type SequenceBlockItem = {
  _type: 'sequenceItem';
  _key: string;
  video: Video;
  copy: SequenceBlockTextFields;
  theme: Maybe<ColorTheme>;
  isHighlighted: boolean;
};

export type SequenceBlock = ContentBlockCommon & {
  _type: 'sequenceBlock';
  sequenceHeader: SequenceBlockTextFields;
  sequenceItems: KeyedArray<SequenceBlockItem>;
  sequenceFooter: string;
};

export type CTACard = {
  _type: 'ctaCard';
  image: RichImage;
  title: string;
  cta: CTA;
};

export type CTACardsBlock = ContentBlockCommon & {
  _type: 'ctaCardsBlock';
  ctaCards: KeyedArray<CTACard>;
};

export type DoubleCtaBlock = ContentBlockCommon & {
  _type: 'doubleCtaBlock';
  doubleCta: DoubleCta;
};

export type LargeCtaCard = {
  eyebrow: string;
  label: string;
  link: Link;
  id: string;
  ariaLabel: string;
};

export type DoubleCta = {
  _type: 'doubleCta';
  ctaOne: LargeCtaCard;
  ctaTwo: LargeCtaCard;
};

export type PractitionersBlock = ContentBlockCommon & {
  _type: 'practitionersBlock';
  practitioners: PractitionerLinkData[];
};

export type ImageTextOverlapBlock = ContentBlockCommon & {
  _type: 'imageTextOverlapBlock';
  image: RichImage;
  copy: RichText;
};

export type QuoteAttribution = {
  label: string;
  labelSubtitle?: Maybe<string>;
  image?: Maybe<Image>;
};

export type QuoteObject = {
  _type: 'quoteObject';
  badgeImage: Maybe<Image>;
  icon?: Maybe<IconBlock>;
  quote: string;
  attribution: QuoteAttribution;
};

export type QuoteBlock = ContentBlockCommon & {
  _type: 'quoteBlock';
  quoteObject: QuoteObject;
  cta: Maybe<CTA>;
};

export type DrawerListItem = {
  _type: 'drawerListItem';
  title: string;
  body: SimpleRichText;
  ctaLink: Maybe<LinkWithLabel>;
  featuredImage: Maybe<RichImage>;
  theme: ColorTheme;
  backgroundImage: Maybe<ResponsiveImageSet>;
};

export type DrawerListBlock = ContentBlockCommon & {
  _type: 'drawerListBlock';
  drawerListItems: KeyedArray<DrawerListItem>;
};

export type TwoUpBlockLayout =
  | 'normal-50-50'
  | 'normal-60-40'
  | 'normal-40-60'
  | 'overlap-50-50';

export type TwoUpBlock = ContentBlockCommon & {
  _type: 'twoUpBlock';
  layout: TwoUpBlockLayout;
  mobileReverseBlockOrder?: Maybe<boolean>;
  /* Only present when the layout is not 'overlap-50-50' */
  normalLayoutTheme?: Maybe<ColorTheme>;
  /* Only present when the layout is 'overlap-50-50' */
  blockThemes?: Maybe<{
    blockOneTheme: ColorTheme;
    blockTwoTheme: ColorTheme;
  }>;
  blockOne: ChildContentBlock;
  blockTwo: ChildContentBlock;
};

export type ReviewItem = {
  _type: 'reviewItem';
  _key: string;
  starRating: number;
  title: string;
  review: SimpleRichText;
  reviewer: {
    name: string;
    age: Maybe<number>;
  };
  date: string;
  logo: Maybe<RichImage>;
};

export type ReviewBlock = ContentBlockCommon & {
  _type: 'reviewBlock';
  reviewHeading: {
    _type: 'reviewHeading';
    title: string;
    description: Maybe<SimpleRichText>;
  };
  reviews: ReviewItem[];
};

export type ImageGridBlock = ContentBlockCommon & {
  _type: 'imageGridBlock';
  theme: string;
  images: KeyedArray<RichImage>;
};

export type FeaturedStoriesBlock = ContentBlockCommon & {
  _type: 'featuredStoriesBlock';
  stories: Array<BlogArticleLinkData>;
};

export type FAQBlock = ContentBlockCommon & {
  _type: 'faqBlock';
  theme: ColorTheme;
  blockTitle: string;
  blockDescription: Maybe<SimpleRichText>;
  blockCta: Maybe<CTA>;
  faqs: Array<FAQ>;
};

export type CardListBlock = ContentBlockCommon & {
  _type: 'cardListBlock';
  drawerListItems: KeyedArray<DrawerListItem>;
};

export type RichTextBlock = ContentBlockCommon & {
  _type: 'richTextBlock';
  theme: ColorTheme;
  richTextChildBlock: any; //RichTextChildBlock;
};

/* Used as a child of the TabsBlock component */
export type TwoUpObject = Omit<TwoUpBlock, '_type' | 'header' | 'subnav'> & {
  _type: 'twoUpObject';
};

export type TabsBlock = ContentBlockCommon & {
  _type: 'tabsBlock';
  tabs: KeyedArray<TabsBlockTab>;
};

type TabsBlockChild = TwoUpObject | ColumnsObject | ContentBlockRichText;

export type TabsBlockTab = {
  _type: 'tabsBlockTab';
  label: string;
  content: TabsBlockChild;
};

export type ColumnsBlockContent = RichTextChildBlock | BigNumber | CTACard;

type ColumnsObjectCommon = {
  columnCount: 4 | 3 | 2;
  theme: ColorTheme;
  content: KeyedArray<ColumnsBlockContent>;
};

export type ColumnsObject = ColumnsObjectCommon & {
  _type: 'columnsObject';
};

export type ColumnsBlock = ContentBlockCommon &
  ColumnsObjectCommon & {
    _type: 'columnsBlock';
  };

export type ContentBlockRichText = {
  _type: 'contentBlockRichText';
  body: RichText;
};

export type TestimonialItem = {
  _type: 'testimonialItem';
  image: Maybe<RichImage>;
  testimonial: SimpleRichText;
  name: string;
  age: Maybe<number>;
  description: Maybe<SimpleRichText>;
};

export type TestimonialBlock = ContentBlockCommon & {
  _type: 'testimonialBlock';
  testimonials: KeyedArray<TestimonialItem>;
};
