import React, { FC } from 'react';
import cn from 'classnames';
import { FAQBlock as FAQBlockType, FAQPageLinkData } from '@/types/sanity';
import { ColorTheme, Theme } from '@/components/Theme';
import { Accordion } from '@/atoms/Accordion';
import { RichText } from '@/components/RichText';
import { LinkButton } from '@/atoms/Button';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { FAQListItem, FAQListWrapper, TitleWrapper, Wrapper } from './styles';

type FAQBlockProps = {
  faqBlock: FAQBlockType;
};

const faqPageLink = {
  _type: 'faqPage',
} as FAQPageLinkData;

export const FAQBlock: FC<FAQBlockProps> = ({ faqBlock }) => {
  const { header, blockTitle, faqs } = faqBlock;
  return (
    <ContentBlockWrapper header={header}>
      <Theme theme={ColorTheme.Sky}>
        <div className={cn(Wrapper)}>
          <div className={cn(TitleWrapper)}>
            <h3 className="font-size-5">{blockTitle}</h3>
            <div className="hidden md:block">
              <LinkButton
                id="faq-block-all-faqs"
                link={faqPageLink}
                label="All FAQs"
                variant="secondary"
              />
            </div>
          </div>
          <div className={cn(FAQListWrapper)}>
            {faqs.map((faq) => (
              <div key={faq._id} className={cn(FAQListItem)}>
                <Accordion title={faq.question}>
                  <div className="pt-3">
                    <RichText content={faq.answer} className="font-size-8" />
                  </div>
                </Accordion>
              </div>
            ))}
          </div>
          <div className="block md:hidden">
            <LinkButton
              id="faq-block-all-faqs"
              link={faqPageLink}
              label="All FAQs"
              variant="secondary"
              width="full"
            />
          </div>
        </div>
      </Theme>
    </ContentBlockWrapper>
  );
};
