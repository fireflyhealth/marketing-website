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
