import React, { FC, useState } from 'react';
import cn from 'classnames';
import { Button } from '@/atoms/Button';
import { slugify } from '@/utils/text';
import {
  FAQCategoryButtons,
  FAQCategorySubjects,
  FAQCategoryWrapper,
} from './styles';
import { FAQSubject, FAQSubjectType } from './FAQSubject';

export type FAQCategoryType = {
  title: string;
  subjects: FAQSubjectType[];
};

type FAQCategoryProps = {
  faqCategory: FAQCategoryType;
};

const getButtonId = (tabTitle: string, label: string) =>
  [slugify(tabTitle), slugify(label)].join('-');

export const FAQCategory: FC<FAQCategoryProps> = ({ faqCategory }) => {
  const { title, subjects } = faqCategory;

  /* 'all' or a subject slug */
  const [activeSubject, setActiveSubject] = useState<string>('all');
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
        <div className="mr-4 pb-4">
          <Button
            variant="outlined"
            active={activeSubject === 'all'}
            onClick={createSubjectButtonHandler('all')}
            aria-selected={activeSubject === 'all'}
            id={getButtonId(title, 'All questions')}
            width="auto"
            label="All questions"
          />
        </div>
        {subjects.map((faqSubject) => (
          <div key={faqSubject.subject.slug.current} className="mr-4 pb-4">
            <Button
              variant="outlined"
              width="auto"
              aria-selected={activeSubject === faqSubject.subject.slug.current}
              active={activeSubject === faqSubject.subject.slug.current}
              onClick={createSubjectButtonHandler(
                faqSubject.subject.slug.current,
              )}
              id={getButtonId(title, faqSubject.subject.title)}
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
