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

export type GenericPageLinkInfo = Pick<GenericPage, '_type' | 'slug'>;

/*
 * Documents
 * */
export type Homepage = SanityDocument & {
  _type: 'homepage';
  seo: Seo;
};

/* Special pages */
export type DownloadPage = SanityDocument & {
  _type: 'downloadPage';
  title: string;
  seo: Seo;
};

export type ContactPage = SanityDocument & {
  _type: 'contactPage';
  title: string;
  seo: Seo;
};

export type NotFoundPage = SanityDocument & {
  _type: 'notFoundPage';
  title: string;
  seo: Seo;
};

export type PressKitPage = SanityDocument & {
  _type: 'pressKitPage';
  title: string;
  seo: Seo;
};

export type FAQPage = SanityDocument & {
  _type: 'faqPage';
  title: string;
  seo: Seo;
};

/* Properties common to both GenericPage & SubPage */
type CommonPage = SanityDocument & {
  title: string;
  seo: Seo;
  slug: Slug;
};

export type GenericPage = CommonPage & {
  _type: 'genericPage';
  subPages?: SubPage[];
};

export type SubPage = CommonPage & {
  _type: 'subPage';
  parentPage: GenericPageLinkInfo;
};

/*
 * Fields
 */

export type Slug = {
  current: string;
};

export type Image = {
  _type: 'image';
  _key: string;
  altText: string;
  caption: null;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  asset?: {
    _id: string;
    _ref: string;
    url: string;
    metadata: {
      lqip: string;
      dimensions: {
        aspectRatio: number;
        width: number;
        height: number;
      };
    };
  };
};

export type Seo = {
  title?: string;
  description?: string;
  image?: Image;
  shareTitle?: string;
  shareDescription?: string;
  shareGraphic?: Image;
};
