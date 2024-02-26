import React, { FC } from 'react';
import cn from 'classnames';
import { FAQBlock as FAQBlockType } from '@/types/sanity';
import { ColorTheme, Theme } from '@/components/Theme';
import { Accordion } from '@/atoms/Accordion';
import { RichText } from '@/components/RichText';
import { CTA } from '@/components/CTA';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import {
  FAQListItem,
  FAQListWrapper,
  TitleWrapper,
  Wrapper,
  Description,
} from './styles';

type FAQBlockProps = {
  faqBlock: FAQBlockType;
};

export const FAQBlock: FC<FAQBlockProps> = ({ faqBlock }) => {
  const { theme, header, blockTitle, blockDescription, blockCta, faqs } =
    faqBlock;
  return (
    <ContentBlockWrapper header={header}>
      <Theme theme={theme || ColorTheme.Sky}>
        <div className={cn(Wrapper)}>
          <div className={cn(TitleWrapper)}>
            <h3 className="font-size-5">{blockTitle}</h3>
            {blockCta ? (
              <div className="hidden md:block">
                <CTA cta={blockCta} />
              </div>
            ) : null}
          </div>
          {blockDescription ? (
            <div className={cn(Description)}>
              <RichText content={blockDescription} />
            </div>
          ) : null}
          <div className={cn(FAQListWrapper)}>
            {faqs.map((faq) => (
              <div key={faq._id} className={cn(FAQListItem)}>
                <Accordion title={faq.question}>
                  <RichText content={faq.answer} className="font-size-8" />
                </Accordion>
              </div>
            ))}
          </div>
          {blockCta ? (
            <div className="block md:hidden">
              <CTA cta={blockCta} />
            </div>
          ) : null}
        </div>
      </Theme>
    </ContentBlockWrapper>
  );
};
