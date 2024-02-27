import {
  NavigationExample,
  CTA,
  LinkWithLabel,
  RichImage,
  RichText,
  Footer,
  ImageBlock,
  ImageCarouselBlock,
  Video,
  VideoHeader,
  CTACardsBlock,
  DoubleCtaBlock,
  PractitionersBlock,
  ImageTextOverlapBlock,
  QuoteBlock,
  DrawerListBlock,
  ResponsiveImageSet,
  TwoUpBlock,
  SequenceBlock,
  ReviewBlock,
  ImageGridBlock,
  FAQBlock,
  CardListBlock,
  FeaturedStoriesBlock,
  ColumnsBlock,
  KeyedArray,
} from '@/types/sanity';
import mockData from './mockData.json';

export const imageExamples = mockData.imageExamples as Array<{
  label: string;
  image: RichImage;
}>;

export const navigationExample =
  mockData.navigationExample as NavigationExample;

export const footerExample = mockData.footer as Footer;

export const imageBlockExample = mockData.contentBlockExamples
  .imageBlock as ImageBlock;
export const imageCarouselBlockExample = mockData.contentBlockExamples
  .imageCarouselBlock as ImageCarouselBlock;
export const ctaCardsBlockExample = mockData.contentBlockExamples
  .ctaCardsBlock as CTACardsBlock;
export const doubleCtaBlock = mockData.contentBlockExamples
  .doubleCtaBlockExample as DoubleCtaBlock;

export const practitionersBlockExample = {
  ...mockData.contentBlockExamples.practitionersBlock,
  /* Our mock data includes duplicate references to practitioners, we
   * map over them here to make sure the _id is unique so we don't get
   * duplicate key warnings */
  practitioners:
    mockData.contentBlockExamples.practitionersBlock.practitioners.map(
      (practitioner, index) => ({
        ...practitioner,
        _id: practitioner._id.concat(`-${index}`),
      }),
    ),
} as PractitionersBlock;

export const drawerListBlockExample = mockData.contentBlockExamples
  .drawerListBlock as DrawerListBlock;
export const featuredStoriesBlockExample = mockData.contentBlockExamples
  .featuredStoriesBlock as FeaturedStoriesBlock;

export const simpleRichText = mockData.simpleRichText as RichText;
export const articleRichText = mockData.articleRichText as RichText;
export const ctaExamples = mockData.ctas as CTA[];

export const linkWithLabelExamples = mockData.links as LinkWithLabel[];
export const responsiveImageSetExample =
  mockData.responsiveImageSet as ResponsiveImageSet;
export const videoExample = mockData.videoExample as Video;

export const videoHeaderExample = mockData.contentBlockExamples
  .videoHeaderExample as VideoHeader;

export const imageTextOverlapBlockExample = mockData.contentBlockExamples
  .imageTextOverlapBlock as ImageTextOverlapBlock;
export const quoteBlock = mockData.contentBlockExamples
  .quoteBlockExample as QuoteBlock;

export const twoUpBlockExamples = mockData.contentBlockExamples
  .twoUpBlocks as TwoUpBlock[];

export const sequenceBlockExample = mockData.contentBlockExamples
  .sequenceBlock as SequenceBlock;

export const reviewBlockExample = mockData.contentBlockExamples
  .reviewBlock as ReviewBlock;

export const imageGridBlockExample = mockData.contentBlockExamples
  .imageGridBlockExample as ImageGridBlock;
export const faqBlockExample = mockData.contentBlockExamples
  .faqBlock as FAQBlock;

export const cardListBlockExample = mockData.contentBlockExamples
  .cardListBlockExample as CardListBlock;

export const columnsBlockExamples = mockData.contentBlockExamples
  .columnsBlocks as KeyedArray<ColumnsBlock>;
