import React, { FC } from 'react';
import { FAQ, FAQSubject as FAQSubjectDocument } from '@/types/sanity';
import { Accordion } from '@/atoms/Accordion';
import { RichText } from '@/components/RichText';

export type SortedFaqSubject = {
  subject: FAQSubjectDocument;
  questions: FAQ[];
};

type FAQSubjectProps = {
  faqSubject: SortedFaqSubject;
};

export const FAQSubject: FC<FAQSubjectProps> = ({ faqSubject }) => {
  const { subject, questions } = faqSubject;
  return (
    <div className="pb-12">
      <h3 className="font-size-8 pb-6">{subject.title}</h3>
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
