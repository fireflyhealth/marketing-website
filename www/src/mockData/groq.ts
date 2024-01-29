import {
  ctaFragment,
  imageFragment,
  linkWithLabelFragment,
  navigationFragment,
  richTextFragment,
} from '@/lib/sanity/queries/fragments';

export const mockDataQuery = `
  *[_type == "mockData" && _id == "mockData"]{
    navigation->{
      ${navigationFragment}
    },
    simpleRichText,
    articleRichText[]{
      ${richTextFragment}
    },
    imageExamples[]{
      label,
      image {
        ${imageFragment}
      }
    },
    ctas[]{
      ${ctaFragment}
    },
    links[]{
      ${linkWithLabelFragment}
    }
  }[0]
`;
