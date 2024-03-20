import { LinkableDocumentData, LinkableDocumentType } from '@/types/sanity';
import { config } from '../config';

export const isLinkableDocumentType = (
  type: string,
): type is LinkableDocumentType => {
  /* Even though this might not be a document type,
   * coerce it so we can leverage exhaustive checking
   * below. */
  const coercedType = type as LinkableDocumentType;
  switch (coercedType) {
    case 'homepage':
    case 'faqPage':
    case 'contactPage':
    case 'downloadPage':
    case 'genericPage':
    case 'subPage':
    case 'blog':
    case 'blogArticle':
    case 'clientPage':
    case 'practitioner':
      return true;
    default:
      /* This will throw a typescript error if we ever add
       * new linkable document types */
      // @ts-expect-error
      console.warn(coercedType.toString);
      return false;
  }
};

/* Returns the path for a linkable document */
export const getLinkableDocumentPath = (doc: LinkableDocumentData): string => {
  switch (doc._type) {
    case 'homepage':
      return '/';
    case 'faqPage':
      return '/faq';
    case 'contactPage':
      return '/contact';
    case 'downloadPage':
      return '/download';
    case 'genericPage':
      return `/${doc.slug.current}`;
    case 'subPage':
      return `/${doc.parentPage.slug.current}/${doc.slug.current}`;
    case 'blog':
      return `/blog/${doc.slug.current}`;
    case 'blogArticle':
      return `/blog/${doc.category.slug.current}/${doc.slug.current}`;
    case 'clientPage':
      return `/with/${doc.slug.current}`;
    case 'practitioner':
      return `/care-team/${doc.slug.current}`;
  }
};

/* Returns the full production URL for a linkable document */
export const getLinkableDocumentProductionUrl = (
  doc: LinkableDocumentData,
): string => config.metadata.productionUrl.concat(getLinkableDocumentPath(doc));

export const getLinkableDocumentLabel = (doc: LinkableDocumentData): string => {
  switch (doc._type) {
    case 'homepage':
      return 'Home';
    case 'faqPage':
      return 'Frequently Asked Questions';
    case 'contactPage':
      return 'Contact Us';
    case 'downloadPage':
      return 'Download the App';
    case 'genericPage':
    case 'subPage':
    case 'blog':
    case 'blogArticle':
      return doc.title;
    case 'clientPage':
      return doc.clientName;
    case 'practitioner':
      return doc.name;
  }
};
