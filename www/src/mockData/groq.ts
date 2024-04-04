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
    headerContentBlockExamples{
      simpleTextHeader{${headerBlockFragment}},
      textHeader{${headerBlockFragment}},
      textWithDualCtaHeader{${headerBlockFragment}},
      videoHeaderExample{${headerBlockFragment}},
    },
    contentBlockExamples{
      columnsBlocks[]{
        _key,
        ${contentBlockFragment}
      },
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
      smallImageCarouselBlock{${contentBlockFragment}},
      dividerBlock{${contentBlockFragment}},
      providerPhilosophyBlock{${contentBlockFragment}},
      videoBlock{${contentBlockFragment}},
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
