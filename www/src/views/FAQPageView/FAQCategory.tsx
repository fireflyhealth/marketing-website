'use client';

import React, { FC, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import cn from 'classnames';
import { FAQCategory as FAQCategoryDocument } from '@/types/sanity';
import { Button } from '@/atoms/Button';
import { slugify } from '@/utils/text';
import {
  FAQCategoryButtons,
  FAQCategorySubjects,
  FAQCategoryWrapper,
} from './styles';
import { FAQSubject, SortedFaqSubject } from './FAQSubject';

export type SortedFAQCategory = {
  category: FAQCategoryDocument;
  subjects: SortedFaqSubject[];
};

type FAQCategoryProps = {
  faqCategory: SortedFAQCategory;
};

const getButtonId = (tabTitle: string, label: string) =>
  [slugify(tabTitle), slugify(label)].join('-');

export const FAQCategory: FC<FAQCategoryProps> = ({ faqCategory }) => {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get('subject');

  const { category, subjects } = faqCategory;

  /* 'all' or a subject slug */
  const [activeSubject, setActiveSubject] = useState<string>('all');

  useEffect(() => {
    if (subjectParam) {
      setActiveSubject(subjectParam);
    }
  }, [subjectParam]);

  const createSubjectButtonHandler = (key: string) => () =>
    setActiveSubject(key);
  const filteredSubjects =
    activeSubject === 'all'
      ? subjects
      : subjects.filter(
          (subject) => subject.subject.slug.current === activeSubject,
        );

  return (
    <div className={cn(FAQCategoryWrapper)}>
      <div className={cn(FAQCategoryButtons)}>
        <div className="mr-4 pb-4" role="listbox">
          <Button
            variant="outlined"
            active={activeSubject === 'all'}
            onClick={createSubjectButtonHandler('all')}
            ariaSelected={activeSubject === 'all'}
            role="option"
            id={getButtonId(category.title, 'All questions')}
            width="auto"
            label="All questions"
          />
        </div>
        {subjects.map((faqSubject) => (
          <div key={faqSubject.subject.slug.current} className="mr-4 pb-4">
            <Button
              variant="outlined"
              width="auto"
              role="option"
              ariaSelected={activeSubject === faqSubject.subject.slug.current}
              active={activeSubject === faqSubject.subject.slug.current}
              onClick={createSubjectButtonHandler(
                faqSubject.subject.slug.current,
              )}
              id={getButtonId(category.title, faqSubject.subject.title)}
              label={faqSubject.subject.title}
            />
          </div>
        ))}
      </div>
      <div className={cn(FAQCategorySubjects)}>
        {filteredSubjects.map((faqSubject) => (
          <FAQSubject
            key={faqSubject.subject.slug.current}
            faqSubject={faqSubject}
          />
        ))}
      </div>
    </div>
  );
};
