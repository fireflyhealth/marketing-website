import { LinkableDocumentData } from '@/types/sanity';

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
      return `/pages/${doc.slug}`;
    /* TODO: subPage, blog, article, ... */
  }
};

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
      return doc.title;
    /* TODO: subPage, blog, article, ... */
  }
};
