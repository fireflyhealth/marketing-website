import {
  ctaFragment,
  imageFragment,
  linkWithLabelFragment,
  richTextFragment,
} from '@/lib/sanity/queries/fragments';

export const mockDataQuery = `
  *[_type == "mockData" && _id == "mockData"]{
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
