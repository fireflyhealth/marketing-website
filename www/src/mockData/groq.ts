import {
  contentBlockFragment,
  ctaFragment,
  doubleCtaFragment,
  footerFragment,
  headerBlockFragment,
  imageFragment,
  linkWithLabelFragment,
  navigationFragment,
  responsiveImageSetFragment,
  richTextFragment,
  videoFragment,
} from '@/lib/sanity/queries/fragments';

export const mockDataQuery = `
  *[_type == "mockData" && _id == "mockData"]{
    contentBlockExamples{
      imageBlock{${contentBlockFragment}},
      imageCarouselBlock{${contentBlockFragment}},
      videoHeaderExample{${headerBlockFragment}},
      ctaCardsBlock{${contentBlockFragment}},
      doubleCtaBlockExample{${contentBlockFragment}},
      practitionersBlock{${contentBlockFragment}},
      imageTextOverlapBlock{${contentBlockFragment}},
      quoteBlock{${contentBlockFragment}},
      drawerListBlock{${contentBlockFragment}},
      quoteBlockExample{${contentBlockFragment}},
      twoUpBlocks[]{${contentBlockFragment}},
      sequenceBlock{${contentBlockFragment}},
      reviewBlock{${contentBlockFragment}},
      imageGridBlockExample{${contentBlockFragment}},
      quoteBlockExample{${contentBlockFragment}},
      twoUpBlocks[]{${contentBlockFragment}},
      faqBlock{${contentBlockFragment}},
      cardListBlockExample{${contentBlockFragment}},
      featuredStoriesBlock{${contentBlockFragment}},
      columnsBlocks[]{${contentBlockFragment}},
      tabsBlock{${contentBlockFragment}},
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
    responsiveImageSet{
      ${responsiveImageSetFragment}
    },
    videoExample{
      ${videoFragment}
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
