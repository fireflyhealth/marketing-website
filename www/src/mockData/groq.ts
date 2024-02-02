import {
  contentBlockFragment,
  ctaFragment,
  footerFragment,
  imageFragment,
  linkWithLabelFragment,
  navigationFragment,
  richTextFragment,
  videoFragment,
} from '@/lib/sanity/queries/fragments';

export const mockDataQuery = `
  *[_type == "mockData" && _id == "mockData"]{
    contentBlockExamples{
      imageBlock{
        ${contentBlockFragment}
      },
      imageCarouselBlock{
        ${contentBlockFragment}
      }
    },
    navigation->{
      _type,
      _id,
      _createdAt,
      _updatedAt,
      title,
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
    videoExample{
      ${videoFragment},
    },
    ctas[]{
      ${ctaFragment}
    },
    links[]{
      ${linkWithLabelFragment}
    },
    "footer": *[
      _type == "siteSettings" && _id == "siteSettings"
    ][0].footer{
      ${footerFragment}
    }
  }[0]
`;
