import React, { FC } from 'react';
import { FAQGroup as FAQGroupType } from '@/types/sanity';
import { Accordion } from '@/atoms/Accordion';
import { RichText } from '@/components/RichText';

type FAQGroupProps = {
  faqGroup: FAQGroupType;
};

export const FAQGroup: FC<FAQGroupProps> = ({ faqGroup }) => {
  const { title, questions } = faqGroup;
  return (
    <div className="pt-12">
      <h3 className="font-size-8 pb-6">{title}</h3>
      <div>
        {questions.map((question) => (
          <div key={question._id} className="border-t theme-border-color py-4">
            <Accordion title={question.question}>
              <RichText content={question.answer} className="font-size-8" />
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};
