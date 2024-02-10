import {
  contentBlockFragment,
  contentBlockHeaderFragment,
  ctaFragment,
  doubleCtaFragment,
  footerFragment,
  imageFragment,
  linkWithLabelFragment,
  navigationFragment,
  richTextFragment,
  videoFragment,
  videoHeaderFragment,
} from '@/lib/sanity/queries/fragments';

export const mockDataQuery = `
  *[_type == "mockData" && _id == "mockData"]{
    contentBlockExamples{
      imageBlock{
        ${contentBlockFragment}
      },
      imageCarouselBlock{
        ${contentBlockFragment}
      },
      videoHeaderExample{
        ${videoHeaderFragment}
      },
      ctaCardsBlock{
        ${contentBlockFragment}
      },
      doubleCtaBlockExample{
        _type,
        doubleCta{${doubleCtaFragment}},
        header{${contentBlockHeaderFragment}},
      },
    },
    navigationExample{
      globalNav->{${navigationFragment}},
      doubleCta{${doubleCtaFragment}}
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
