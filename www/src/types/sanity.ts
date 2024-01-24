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
  _createdAt: string;
  _updatedAt: string;
}

type FileAsset = {
  _type: 'sanity.fileAsset';
  _id: string;
  url: string;
  originalFilename: string;
  extension: string;
  size: number;
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
  | GenericPage;
/* TODO: SubPage, Blogs, Articles, ... */

export type LinkableDocumentData =
  | HomepageLinkData
  | DownloadPageLinkData
  | ContactPageLinkData
  | FAQPageLinkData
  | GenericPageLinkData;

/**
 * Documents
 */

export type SiteSettings = SanityDocument & {
  _type: 'siteSettings';
  globalNav: {
    _type: string;
    title: string;
    navGroup: NavGroupType[];
  };
  logoColor: Image;
  logoMonochrome: Image;
  defaultMetadata: Metadata;
};

export type Homepage = SanityDocument & {
  _type: 'homepage';
  metadata?: Metadata;
  sampleSimpleRichText?: RichText;
};
export type HomepageLinkData = Pick<Homepage, '_type'>;

/* Special pages */
export type DownloadPage = SanityDocument & {
  _type: 'downloadPage';
  title: string;
  metadata?: Metadata;
};
export type DownloadPageLinkData = Pick<DownloadPage, '_type'>;

export type ContactPage = SanityDocument & {
  _type: 'contactPage';
  title: string;
  metadata?: Metadata;
};
export type ContactPageLinkData = Pick<ContactPage, '_type'>;

export type NotFoundPage = SanityDocument & {
  _type: 'notFoundPage';
  title: string;
  metadata?: Metadata;
};

export type FAQPage = SanityDocument & {
  _type: 'faqPage';
  title: string;
  metadata?: Metadata;
};
export type FAQPageLinkData = Pick<FAQPage, '_type'>;

/* Properties common to both GenericPage & SubPage */
type CommonPage = SanityDocument & {
  title: string;
  metadata?: Metadata;
  slug: Slug;
};

export type GenericPage = CommonPage & {
  _type: 'genericPage';
  subPages?: SubPage[];
};
export type GenericPageLinkData = Pick<GenericPage, '_type' | 'slug' | 'title'>;

export type SubPage = CommonPage & {
  _type: 'subPage';
  parentPage: GenericPageLinkData;
};

/* Client Page */
export type ClientPage = SanityDocument & {
  _type: 'clientPage';
  clientName: string;
  slug: Slug;
  metadata?: Metadata;
};

/* Blogs */
export type Blog = SanityDocument & {
  _type: 'blog';
  title: string;
  slug: Slug;
  articles?: BlogArticle[];
  metadata?: Metadata;
};

export type BlogArticle = SanityDocument & {
  _type: 'blogArticle';
  title: string;
  slug: Slug;
  /* TODO linking - change this to BlogPageLinkData */
  category: Pick<Blog, 'title' | 'slug' | '_type'>;
  metadata?: Metadata;
};

/* Navigation */
export type LinkWithLabel = {
  _type: 'linkWithLabel';
  _key: string;
  label: string;
  link: {
    slug: string;
  };
};

export type LabelWithDropdown = {
  _type: 'labelWithDropdown';
  _key: string;
  label: string;
  subpages: LinkWithLabel[];
};

export type NavGroupType = LinkWithLabel | LabelWithDropdown;

/*
 * Fields
 */

export type Slug = {
  current: string;
};

/* An enhanced image field that includes a caption & required alt text */
export type RichImage = Omit<Image, '_type'> & {
  _type: 'richImage';
  altText: string;
  caption: string | null;
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

export type Metadata = {
  title?: string;
  description?: string;
  shareTitle?: string;
  shareDescription?: string;
  shareGraphic?: Image;
};

export type Link = {
  documentLink?: Maybe<LinkableDocument>;
  externalUrl?: Maybe<string>;
  file?: Maybe<FileAsset>;
};

export type CTA = {
  label: string;
  ariaLabel?: string;
  id: string;
  variant: 'primary' | 'secondary' | 'outlined';
  link: Link;
};

export type RichText = PortableTextBlock[];
