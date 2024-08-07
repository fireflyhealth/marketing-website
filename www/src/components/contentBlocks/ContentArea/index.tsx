import React, { FC } from 'react';
import {
  ContentBlock as ContentBlockType,
  KeyedArray,
  Maybe,
  SubnavItem,
} from '@/types/sanity';
import { filterMaybes } from '@/utils/arrays';
import { Subnav } from '@/components/Subnav';

import { ImageBlock } from '../ImageBlock';
import { ImageCarouselBlock } from '../ImageCarouselBlock';
import { PractitionersBlock } from '../PractitionersBlock';
import { ImageTextOverlapBlock } from '../ImageTextOverlapBlock';
import { QuoteBlock } from '../QuoteBlock';
import { DoubleCtaBlock } from '../DoubleCtaBlock';
import { DrawerListBlock } from '../DrawerListBlock';
import { TwoUpBlock } from '../TwoUpBlock';
import { SequenceBlock } from '../SequenceBlock';
import { ReviewBlock } from '../ReviewBlock';
import { ImageGridBlock } from '../ImageGridBlock';
import { FAQBlock } from '../FAQBlock';
import { CardListBlock } from '../CardListBlock';
import { FeaturedStoriesBlock } from '../FeaturedStoriesBlock';
import { ColumnsBlock } from '../ColumnsBlock';
import { TabsBlock } from '../TabsBlock';
import { TestimonialBlock } from '../TestimonialBlock';
import { RichTextBlock } from '../RichTextBlock';
import { DividerBlock } from '../DividerBlock';
import { SmallImageCarouselBlock } from '../SmallImageCarouselBlock';
import { VideoBlock } from '../VideoBlock';
import { ProviderPhilosophyBlock } from '../ProviderPhilosophyBlock';
import { NearbyBlock } from '../NearbyBlock';
import { HubspotFormBlock } from '../HubspotFormBlock';

type ContentBlockProps = {
  block: ContentBlockType;
};

const ContentBlock: FC<ContentBlockProps> = ({ block }) => {
  switch (block._type) {
    case 'imageBlock':
      return <ImageBlock imageBlock={block} />;
    case 'imageCarouselBlock':
      return <ImageCarouselBlock imageCarouselBlock={block} />;
    case 'practitionersBlock':
      return <PractitionersBlock practitionersBlock={block} />;
    case 'imageTextOverlapBlock':
      return <ImageTextOverlapBlock imageTextOverlapBlock={block} />;
    case 'quoteBlock':
      return <QuoteBlock quoteBlock={block} />;
    case 'drawerListBlock':
      return <DrawerListBlock drawerListBlock={block} />;
    case 'doubleCtaBlock':
      return <DoubleCtaBlock doubleCtaBlock={block} />;
    case 'twoUpBlock':
      return <TwoUpBlock twoUpBlock={block} />;
    case 'sequenceBlock':
      return <SequenceBlock sequenceBlock={block} />;
    case 'reviewBlock':
      return <ReviewBlock reviewBlock={block} />;
    case 'imageGridBlock':
      return <ImageGridBlock imageGridBlock={block} />;
    case 'faqBlock':
      return <FAQBlock faqBlock={block} />;
    case 'cardListBlock':
      return <CardListBlock cardListBlock={block} />;
    case 'featuredStoriesBlock':
      return <FeaturedStoriesBlock featuredStoriesBlock={block} />;
    case 'columnsBlock':
      return <ColumnsBlock columnsBlock={block} />;
    case 'tabsBlock':
      return <TabsBlock tabsBlock={block} />;
    case 'testimonialBlock':
      return <TestimonialBlock testimonialBlock={block} />;
    case 'richTextBlock':
      return <RichTextBlock richTextBlock={block} />;
    case 'dividerBlock':
      return <DividerBlock dividerBlock={block} />;
    case 'smallImageCarouselBlock':
      return <SmallImageCarouselBlock smallImageCarouselBlock={block} />;
    case 'videoBlock':
      return <VideoBlock videoBlock={block} />;
    case 'providerPhilosophyBlock':
      return <ProviderPhilosophyBlock providerPhilosophyBlock={block} />;
    case 'nearbyBlock':
      return <NearbyBlock nearbyBlock={block} />;
    case 'hubspotFormBlock':
      return <HubspotFormBlock hubspotFormBlock={block} />;
    default:
      console.warn(
        // @ts-expect-error
        `"${block._type.toString()} is not a valid content block type"`,
      );
      return null;
  }
};

type ContentAreaProps = {
  blocks: KeyedArray<ContentBlockType>;
  renderSubnav: boolean;
  subNav?: Maybe<SubnavItem[]>;
};

export const ContentArea: FC<ContentAreaProps> = ({
  blocks,
  renderSubnav,
  subNav,
}) => {
  return (
    <div id="content-area" className="ContentArea">
      <Subnav renderSubnav={renderSubnav} subnav={subNav} />
      {filterMaybes(blocks).map((block) => (
        <ContentBlock block={block} key={block._key} />
      ))}
    </div>
  );
};
