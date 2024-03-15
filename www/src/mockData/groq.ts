import {
  contentBlockFragment,
  ctaFragment,
  doubleCtaFragment,
  faqFragment,
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
      columnsBlocks[]{
        _key,
        ${contentBlockFragment}
      },
      ctaCardsBlock{${contentBlockFragment}},
      cardListBlockExample{${contentBlockFragment}},
      doubleCtaBlockExample{${contentBlockFragment}},
      drawerListBlock{${contentBlockFragment}},
      faqBlock{${contentBlockFragment}},
      featuredStoriesBlock{${contentBlockFragment}},
      practitionersBlock{${contentBlockFragment}},
      imageBlock{${contentBlockFragment}},
      imageCarouselBlock{${contentBlockFragment}},
      imageGridBlockExample{${contentBlockFragment}},
      imageTextOverlapBlock{${contentBlockFragment}},
      quoteBlockExample{${contentBlockFragment}},
      reviewBlock{${contentBlockFragment}},
      richTextBlocks[]{
        _key,
        ${contentBlockFragment}
      },
      sequenceBlock{${contentBlockFragment}},
      tabsBlock{${contentBlockFragment}},
      testimonialBlock{${contentBlockFragment}},
      twoUpBlocks[]{
        _key,
        ${contentBlockFragment}
      },
      videoHeaderExample{${headerBlockFragment}},
    },
    navigationExample{
      globalNav->{${navigationFragment}},
      doubleCta{${doubleCtaFragment}}
    },
    simpleRichText[]{
      ${richTextFragment}
    },
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
    },
    "faqs": *[_type == "faq"]{
      ${faqFragment}
    }
  }[0]
`;
