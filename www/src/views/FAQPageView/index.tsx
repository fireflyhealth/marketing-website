import React, { FC, useMemo } from 'react';
import {
  FAQ,
  FAQPage,
  FAQCategory as FAQCategoryDocument,
  FAQSubject as FAQSubjectDocument,
} from '@/types/sanity';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Tabs } from '@/components/Tabs';
import { FAQCategory, SortedFAQCategory } from './FAQCategory';

export type FAQPageViewProps = {
  faqPage: FAQPage;
};

/**
 * Parse raw FAQs into Category->Subject structure
 */
const getCategoryGroups = (faqs: FAQ[]): SortedFAQCategory[] => {
  /* Group FAQs by category */
  const mappedCategories = faqs.reduce<
    Record<string, { category: FAQCategoryDocument; questions: FAQ[] }>
  >((prevGroups, faq) => {
    const prevGroupCategoryQuestions =
      prevGroups[faq.category.slug.current]?.questions || [];
    return {
      ...prevGroups,
      [faq.category.slug.current]: {
        category: faq.category,
        questions: [...prevGroupCategoryQuestions, faq],
      },
    };
  }, {});
  const sortedMappedCategories = Object.values(mappedCategories).sort(
    (catA, catB) => {
      if (catA.category.title === catB.category.title) return 0;
      return catA.category.title < catB.category.title ? -1 : 1;
    },
  );
  /* For each category, group questions by subject */
  const categoriesWithGroups = sortedMappedCategories.map((category) => {
    const mappedSubjectQuestions = category.questions.reduce<
      Record<string, { subject: FAQSubjectDocument; questions: FAQ[] }>
    >((prevSubjects, question) => {
      const subject = question.subject;
      const prevSubjectQuestions =
        prevSubjects[question.subject.slug.current]?.questions || [];
      return {
        ...prevSubjects,
        [subject.slug.current]: {
          subject,
          questions: [...prevSubjectQuestions, question],
        },
      };
    }, {});
    /* Map over each subject to alphabetize the FAQs */
    const subjects = Object.values(mappedSubjectQuestions).map((subject) => ({
      ...subject,
      questions: subject.questions.sort((qA, qB) => {
        if (qA.question === qB.question) {
          return 0;
        }
        return qA.question < qB.question ? -1 : 1;
      }),
    }));
    return { category: category.category, subjects };
  });
  return categoriesWithGroups;
};

export const FAQPageView: FC<FAQPageViewProps> = ({ faqPage }) => {
  const faqCategories = useMemo(
    () => getCategoryGroups(faqPage.faqs),
    [faqPage],
  );

  return (
    <div className="p-4 md:p-12">
      <HeaderArea block={faqPage.header} />
      <h1 className="font-trust font-size-3">{faqPage.title}</h1>
      <div>
        <Tabs
          tabs={faqCategories.map((faqCategory) => ({
            _key: faqCategory.category.slug.current,
            label: faqCategory.category.title,
            slug: faqCategory.category.slug.current,
            children: <FAQCategory faqCategory={faqCategory} />,
          }))}
        />
      </div>
    </div>
  );
};
