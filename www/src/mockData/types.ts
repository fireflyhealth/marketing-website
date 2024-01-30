import { KeyedArray, LinkWithLabel, RichText } from '@/types/sanity';

export type MockData = {
  links: KeyedArray<LinkWithLabel>;
  simpleRichText: RichText;
  articleRichText: RichText;
};
