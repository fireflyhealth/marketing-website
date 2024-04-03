export const API_VERSION = '2024-01-01';

export const SingletonPageSlugs = {
  Download: 'download',
  Contact: 'contact',
  FAQ: 'faq',
};

/**
 * Previews
 */

/* The document types that get a "Preview" pane */
export const previewDocumentTypes = [
  'homepage',
  'blog',
  'blogArticle',
  'clientPage',
  'faqPage',
  'genericPage',
  'practitioner',
  'downloadPage',
  'contactPage',
];

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

/**
 * Define which document types are not eligible for the A/B testing
 * field & configuration.
 **/
export const abEligibleDocumentTypes = linkableDocumentTypes.filter(
  (type) => type !== 'faqPage',
);

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
export const defaultContentBlockTypes = [
  { type: 'cardListBlock' },
  { type: 'columnsBlock' },
  { type: 'dividerBlock' },
  { type: 'doubleCtaBlock' },
  { type: 'drawerListBlock' },
  { type: 'faqBlock' },
  { type: 'featuredStoriesBlock' },
  { type: 'imageBlock' },
  { type: 'imageCarouselBlock' },
  { type: 'imageGridBlock' },
  { type: 'imageTextOverlapBlock' },
  { type: 'nearbyBlock' },
  { type: 'practitionersBlock' },
  { type: 'quoteBlock' },
  { type: 'reviewBlock' },
  { type: 'richTextBlock' },
  { type: 'sequenceBlock' },
  { type: 'smallImageCarouselBlock' },
  { type: 'tabsBlock' },
  { type: 'testimonialBlock' },
  { type: 'twoUpBlock' },
];

/**
 * An abbreviated list of content blocks
 * that only appear on Provider pages.
 *
 * (These always have a 'header' field)
 */
export const providerPageBlockTypes = [
  { type: 'columnsBlock' },
  { type: 'imageGridBlock' },
  { type: 'providerPhilosophyBlock' },
  { type: 'testimonialBlock' },
  { type: 'videoBlock' },
];
