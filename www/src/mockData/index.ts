import {
  Navigation,
  CTA,
  LinkWithLabel,
  RichImage,
  RichText,
  Footer,
  ImageBlock,
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

export const simpleRichText = mockData.simpleRichText as RichText;
export const articleRichText = mockData.articleRichText as RichText;
export const ctaExamples = mockData.ctas as CTA[];

export const linkWithLabelExamples = mockData.links as LinkWithLabel[];