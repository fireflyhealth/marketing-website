import { PortableTextBlock } from '@portabletext/types';

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
  | ClientPage;
/* TODO: SubPage, Blogs, Articles, ... */

export type LinkableDocumentData =
  | HomepageLinkData
  | DownloadPageLinkData
  | ContactPageLinkData
  | FAQPageLinkData
  | GenericPageLinkData
  | SubPageLinkData
  | BlogLinkData
  | BlogArticleLinkData
  | ClientPageLinkData;

/**
 * Documents
 */

export type Navigation = SanityDocument & {
  _type: 'navigation';
  navGroup: KeyedArray<NavGroupType>;
  showNavCTA: boolean;
};

export type SiteSettings = SanityDocument & {
  _type: 'siteSettings';
  globalNav: Navigation;
  globalAnnouncementBanner: AnnouncementBanner;
  defaultMetadata: Metadata;
  footer: Footer;
};

export type Homepage = SanityDocument & {
  _type: 'homepage';
  navigationOverrides?: NavigationOverrides;
  metadata?: Metadata;
  sampleSimpleRichText?: RichText;
};
export type HomepageLinkData = Pick<Homepage, '_type'>;

/* Special pages */
export type DownloadPage = SanityDocument & {
  _type: 'downloadPage';
  title: string;
  navigationOverrides?: NavigationOverrides;
  metadata?: Metadata;
};
export type DownloadPageLinkData = Pick<DownloadPage, '_type'>;

export type ContactPage = SanityDocument & {
  _type: 'contactPage';
  title: string;
  navigationOverrides?: NavigationOverrides;
  metadata?: Metadata;
};
export type ContactPageLinkData = Pick<ContactPage, '_type'>;

export type NotFoundPage = SanityDocument & {
  _type: 'notFoundPage';
  title: string;
  navigationOverrides?: NavigationOverrides;
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
  metadata?: Metadata;
};
export type ClientPageLinkData = Pick<
  ClientPage,
  '_type' | 'slug' | 'clientName'
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
  _key: string;
  label: string;
  link: Link | LinkableDocument;
};

export type LabelWithDropdown = {
  _type: 'labelWithDropdown';
  label: string;
  subpages: LinkWithLabel[];
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

/* Note: You can add more types & serializers for
 * other blocks that may be included in the future, i.e.:
 * Array<PortableTextBlock | ImageBlock>[] */
export type RichText = Array<PortableTextBlock | HubspotForm>;

export type HubspotForm = {
  _type: 'form';
  formId: string;
};

export type ContentBlock = ImageBlock | ImageCarouselBlock;

export type ContentArea = ContentBlock[];

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
