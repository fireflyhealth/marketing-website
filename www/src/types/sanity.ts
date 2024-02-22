import { PortableTextBlock } from '@portabletext/types';
import { ColorTheme } from '@/components/Theme';

/**
 * Generic
 */

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

export type Navigation = SanityDocument & {
  _type: 'navigation';
  navGroup: KeyedArray<NavGroupType>;
  showNavCTA: boolean;
};

export type NavigationExample = {
  globalNav: Navigation;
  doubleCta: DoubleCta;
};

export type SiteSettings = SanityDocument & {
  _type: 'siteSettings';
  globalNav: Navigation;
  globalAnnouncementBanner: AnnouncementBanner;
  globalDoubleCta: DoubleCta;
  defaultMetadata: Metadata;
  footer: Footer;
};

export type Homepage = SanityDocument & {
  _type: 'homepage';
  navigationOverrides?: NavigationOverrides;
  metadata?: Metadata;
  header: HeaderArea;
  content: ContentArea;
};
export type HomepageLinkData = Pick<Homepage, '_type'>;

/* Special pages */
export type DownloadPage = SanityDocument & {
  _type: 'downloadPage';
  title: string;
  navigationOverrides?: NavigationOverrides;
  header: HeaderArea;
  content: ContentArea;
  metadata?: Metadata;
};
export type DownloadPageLinkData = Pick<DownloadPage, '_type'>;

export type ContactPage = SanityDocument & {
  _type: 'contactPage';
  title: string;
  navigationOverrides?: NavigationOverrides;
  header: HeaderArea;
  content: ContentArea;
  metadata?: Metadata;
};
export type ContactPageLinkData = Pick<ContactPage, '_type'>;

export type NotFoundPage = SanityDocument & {
  _type: 'notFoundPage';
  title: string;
  navigationOverrides?: NavigationOverrides;
  header: HeaderArea;
  content: ContentArea;
  metadata?: Metadata;
};

export type FAQPage = SanityDocument & {
  _type: 'faqPage';
  title: string;
  navigationOverrides?: NavigationOverrides;
  metadata?: Metadata;
};
export type FAQPageLinkData = Pick<FAQPage, '_type'>;

/* Properties common to both GenericPage & SubPage */
type CommonPage = SanityDocument & {
  title: string;
  header: HeaderArea;
  content: ContentArea;
  metadata?: Metadata;
  slug: Slug;
  navigationOverrides?: NavigationOverrides;
};

export type GenericPage = CommonPage & {
  _type: 'genericPage';
  subPages?: KeyedArray<SubPage>;
};
export type GenericPageLinkData = Pick<GenericPage, '_type' | 'slug' | 'title'>;

export type SubPage = CommonPage & {
  _type: 'subPage';
  parentPage: GenericPageLinkData;
};

export type SubPageLinkData = Pick<
  SubPage,
  '_type' | 'slug' | 'title' | 'parentPage'
>;

/* Client Page */
export type ClientPage = SanityDocument & {
  _type: 'clientPage';
  clientName: string;
  slug: Slug;
  navigationOverrides?: NavigationOverrides;
  header: HeaderArea;
  content: ContentArea;
  metadata?: Metadata;
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
  navigationOverrides?: NavigationOverrides;
  articles?: BlogArticle[];
  metadata?: Metadata;
};
export type BlogLinkData = Pick<Blog, '_type' | 'slug' | 'title'>;

export type BlogArticle = SanityDocument & {
  _type: 'blogArticle';
  title: string;
  slug: Slug;
  navigationOverrides?: NavigationOverrides;
  /* TODO linking - change this to BlogPageLinkData */
  category: BlogLinkData;
  metadata?: Metadata;
};

export type BlogArticleLinkData = Pick<
  BlogArticle,
  '_type' | 'slug' | 'title' | 'category'
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
  body: string;
};

/* An enhanced image field that includes a caption & required alt text */
export type RichImage = Omit<Image, '_type'> & {
  _type: 'richImage';
  altText: string;
  caption: Maybe<string>;
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
  documentLink: Maybe<LinkableDocumentData>;
  externalUrl: Maybe<string>;
  file: Maybe<FileAsset>;
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
  icon: string;
};
export type BigNumber = {
  _type: 'bigNumber';
  unit: Maybe<{
    unitValue: string;
    position: 'before' | 'after';
  }>;
  value: number;
  description: RichText;
};

export type BigNumbers = {
  _type: 'bigNumbers';
  bigNumbers: KeyedArray<BigNumber>;
  citation: Maybe<RichText>;
};

export type TwoColumnUnorderedList = {
  _type: 'twoColumnUnorderedList';
  _key: string;
  listItems: string[];
};

/**
 * Header Area Block
 */
export type HeaderBlock = VideoHeader | TextHeader;

export type HeaderArea = HeaderBlock;

export type VideoHeader = {
  _type: 'videoHeader';
  eyebrow: string;
  heading: string;
  body: RichText;
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

/**
 * Child Content Blocks
 */

export type ChildContentBlock =
  | RichTextChildBlock
  | ImageChildBlock
  | QuoteChildBlock
  | BigNumbers;

export type RichTextChildBlock = {
  _type: 'richTextChildBlock';
  heading: string;
  body: RichText;
};

export type ImageChildBlock = {
  _type: 'imageChildBlock';
  image: RichImage;
};

export type QuoteChildBlock = {
  _type: 'quoteChildBlock';
  quote: QuoteObject;
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
  | TwoUpBlock;

export type ContentArea = KeyedArray<ContentBlock>;

export type ContentBlockHeader = {
  _type: 'contentBlockHeader';
  title: string;
  description: Maybe<RichText>;
  cta: Maybe<CTA>;
};

export type ImageBlock = {
  _type: 'imageBlock';
  header: Maybe<ContentBlockHeader>;
  image: RichImage;
};

export type ImageCarouselBlock = {
  _type: 'imageCarouselBlock';
  header: Maybe<ContentBlockHeader>;
  images: KeyedArray<RichImage>;
};

export type CTACard = {
  _type: 'ctaCard';
  image: RichImage;
  title: string;
  cta: CTA;
};

export type CTACardsBlock = {
  _type: 'ctaCardsBlock';
  header: Maybe<ContentBlockHeader>;
  ctaCards: KeyedArray<CTACard>;
};

export type DoubleCtaBlock = {
  _type: 'doubleCtaBlock';
  doubleCta: DoubleCta;
  header: Maybe<ContentBlockHeader>;
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

export type PractitionersBlock = {
  _type: 'practitionersBlock';
  header: Maybe<ContentBlockHeader>;
  practitioners: PractitionerLinkData[];
};

export type ImageTextOverlapBlock = {
  _type: 'imageTextOverlapBlock';
  header: Maybe<ContentBlockHeader>;
  image: RichImage;
  copy: RichText;
};

export type QuoteAttribution = {
  label: string;
  labelSubtitle: Maybe<string>;
  image: Maybe<Image>;
};

export type QuoteObject = {
  _type: 'quoteObject';
  badgeImage: Maybe<Image>;
  quote: string;
  attribution: QuoteAttribution;
};

export type QuoteBlock = {
  _type: 'quoteBlock';
  header: Maybe<ContentBlockHeader>;
  quoteObject: QuoteObject;
  cta: CTA;
};

export type DrawerListItem = {
  _type: 'drawerListItem';
  title: string;
  body: RichText;
  ctaLink: Maybe<LinkWithLabel>;
  featuredImage: RichImage;
  theme: ColorTheme;
  backgroundImage: Maybe<ResponsiveImageSet>;
};

export type DrawerListBlock = {
  _type: 'drawerListBlock';
  header: Maybe<ContentBlockHeader>;
  drawerListItems: KeyedArray<DrawerListItem>;
};
export type TwoUpBlockLayout =
  | 'normal-50-50'
  | 'normal-60-40'
  | 'normal-40-60'
  | 'overlap-50-50';

export type TwoUpBlock = {
  _type: 'twoUpBlock';
  header: Maybe<ContentBlockHeader>;
  layout: TwoUpBlockLayout;
  mobileReverseBlockOrder: Maybe<boolean>;
  /* Only present when the layout is 'overlap-50-50' */
  blockThemes: Maybe<{
    blockOneTheme: ColorTheme;
    blockTwoTheme: ColorTheme;
  }>;
  blockOne: ChildContentBlock;
  blockTwo: ChildContentBlock;
};
