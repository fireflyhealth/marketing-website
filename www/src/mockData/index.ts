import {
  Navigation,
  CTA,
  LinkWithLabel,
  RichImage,
  RichText,
} from '@/types/sanity';
import mockData from './mockData.json';

export const imageExamples = mockData.imageExamples as Array<{
  label: string;
  image: RichImage;
}>;

export const navigationExample = mockData.navigation as Navigation;

export const simpleRichText = mockData.simpleRichText as RichText;
export const articleRichText = mockData.articleRichText as RichText;
export const ctaExamples = mockData.ctas as CTA[];

export const linkWithLabelExamples = mockData.links as LinkWithLabel[];
