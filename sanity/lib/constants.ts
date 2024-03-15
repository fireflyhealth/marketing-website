export const API_VERSION = '2024-01-01';

export const SingletonPageSlugs = {
  Download: 'download',
  Contact: 'contact',
  FAQ: 'faq',
};

/**
 * --- Linkable Documents ---
 *
 * The schema type names of documents that can be linked
 * (and navigated) to, for use in places like Navigation,
 * links in rich text, and so on.
 *
 * Each of these document types will have corresponding pages
 * in the frontend.
 *
 * **** NOTE TO DEVELOPERS ****
 *
 * are you modifying this list of linkable types? If so, you
 * will need to make some changes:
 *
 * in www:
 *
 * - Add a new document type and add to LinkableDocument
 * - Figure out what information is needed to render a full thumbnail
 *   link for this document, and create a new LinkableDocumentData type.
 *   (sometimes this field will be used for text-only links, but at
 *   other times it may be used for a card with an image)
 * - Update the linkableDocumentFragment in lib/sanity
 * - Update getLinkableDocumentLabel and getLinkableDocumentUrl in utils/linking
 * - Update the Sitemap.get query and sitemap.xml.tsx route to include this new
 *   page type
 *
 * Then, test it thoroughly:
 *
 * - Visit localhost:3000/sitemap.xml and make sure the URLs for this new document
 *   type are listed correctly
 * - Link to this page in rich text
 * - Link to this page in a CTA
 * - Link to this page in a navigation item
 * - Link to this page in a Hero or Image & Text block
 *
 *   and make sure they all navigate to the expected URL when clicked on.
 *
 * Thank you!
 */
export const linkableDocumentTypes = [
  'homepage',
  'downloadPage',
  'faqPage',
  'contactPage',
  'genericPage',
  'subPage',
  'blog',
  'blogArticle',
  'clientPage',
  'practitioner',
];

export const themeOptions = [
  { title: 'White', value: 'white' },
  { title: 'Grey', value: 'grey' },
  { title: 'Sienna', value: 'sienna' },
  { title: 'Midnight', value: 'midnight' },
  { title: 'Sky', value: 'sky' },
];

/**
 * Content blocks that can appear in the main
 * "content area" column
 *
 * (These always have a 'header' field)
 */

/* TODO: Would be nice to better organize these for editors.
 * Alphabetically? Grouped by content type? */
export const defaultContentBlockTypes = [
  { type: 'imageBlock' },
  { type: 'imageCarouselBlock' },
  { type: 'ctaCardsBlock' },
  { type: 'doubleCtaBlock' },
  { type: 'practitionersBlock' },
  { type: 'twoUpBlock' },
  { type: 'imageTextOverlapBlock' },
  { type: 'quoteBlock' },
  { type: 'drawerListBlock' },
  { type: 'sequenceBlock' },
  { type: 'reviewBlock' },
  { type: 'imageGridBlock' },
  { type: 'faqBlock' },
  { type: 'cardListBlock' },
  { type: 'featuredStoriesBlock' },
  { type: 'columnsBlock' },
  { type: 'richTextBlock' },
  { type: 'tabsBlock' },
  { type: 'testimonialBlock' },
  { type: 'dividerBlock' },
];
