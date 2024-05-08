'use client';

import React, { FC, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { FAQ, FAQSubject as FAQSubjectDocument } from '@/types/sanity';
import { Accordion } from '@/atoms/Accordion';
import { RichText } from '@/components/RichText';

export type SortedFaqSubject = {
  subject: FAQSubjectDocument;
  questions: FAQ[];
};

type FAQSubjectProps = {
  faqSubject: SortedFaqSubject;
  category: string;
};

export const FAQSubject: FC<FAQSubjectProps> = ({ faqSubject }) => {
  const searchParams = useSearchParams();
  const faqParam = searchParams?.get('faq');

  const initialOpenAccordionRef = useRef<HTMLDivElement>(null);

  const { subject, questions } = faqSubject;

  useEffect(() => {
    if (faqParam && initialOpenAccordionRef.current) {
      initialOpenAccordionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [faqParam, initialOpenAccordionRef.current]);

  return (
    <div className="pb-12">
      <h3 className="font-size-7 pb-6">{subject.title}</h3>
      <div>
        {questions.map((question) => (
          <div
            ref={
              question.slug.current === faqParam
                ? initialOpenAccordionRef
                : undefined
            }
            key={question._id}
            className="border-t theme-border-color py-4"
          >
            <Accordion
              title={question.question}
              isOpen={faqParam === question.slug.current}
            >
              <RichText content={question.answer} className="font-size-8" />
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};
