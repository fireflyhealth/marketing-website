import {
  Navigation,
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
} from '@/types/sanity';
import mockData from './mockData.json';

export const imageExamples = mockData.imageExamples as Array<{
  label: string;
  image: RichImage;
}>;

export const navigationExample = mockData.navigation as Navigation;
export const footerExample = mockData.footer as Footer;

export const imageBlockExample = mockData.contentBlockExamples
  .imageBlock as ImageBlock;
export const imageCarouselBlockExample = mockData.contentBlockExamples
  .imageCarouselBlock as ImageCarouselBlock;
export const ctaCardsBlockExample = mockData.contentBlockExamples
  .ctaCardsBlock as CTACardsBlock;
export const doubleCtaBlock = mockData.contentBlockExamples
  .doubleCtaBlockExample as DoubleCtaBlock;

export const simpleRichText = mockData.simpleRichText as RichText;
export const articleRichText = mockData.articleRichText as RichText;
export const ctaExamples = mockData.ctas as CTA[];

export const linkWithLabelExamples = mockData.links as LinkWithLabel[];

export const videoExample = mockData.videoExample as Video;

export const videoHeaderExample = mockData.contentBlockExamples
  .videoHeaderExample as VideoHeader;
