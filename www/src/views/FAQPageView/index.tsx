import React, { FC, useMemo } from 'react';
import { FAQ, FAQPage, FAQSubject as FAQSubjectDocument } from '@/types/sanity';
import { HeaderArea } from '@/components/headerContentBlocks/HeaderArea';
import { Tabs } from '@/components/Tabs';
import { FAQTab } from './FAQTab';
import { FAQGroupType } from './FAQGroup';
import { FAQCategory, FAQCategoryType } from './FAQCategory';

type FAQPageViewProps = {
  faqPage: FAQPage;
};

/**
 * Parse raw FAQs into Category->Subject structure
 */
const getCategoryGroups = (faqs: FAQ[]): FAQCategoryType[] => {
  /* Group FAQs by category */
  const mappedCategories = faqs.reduce<Record<string, FAQ[]>>(
    (prevGroups, faq) => {
      const prevGroupQuestions = prevGroups[faq.category] || [];
      return {
        ...prevGroups,
        [faq.category]: [...prevGroupQuestions, faq],
      };
    },
    {},
  );
  /* We can't control the order that the categories compile to,
   * so here we coerce them into the order we want the tabs to appear
   * on the page. */
  const sortedMappedCategories = {
    'For Individuals': mappedCategories['For Individuals'],
    'For Providers': mappedCategories['For Providers'],
  };
  /* For each category, group questions by subject */
  const categoriesWithGroups = Object.entries(sortedMappedCategories).map(
    ([category, questions]) => {
      const mappedSubjectQuestions = questions.reduce<
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
      const subjects = Object.values(mappedSubjectQuestions);
      return { title: category, subjects };
    },
  );
  return categoriesWithGroups.sort();
};

export const FAQPageView: FC<FAQPageViewProps> = ({ faqPage }) => {
  const faqCategories: FAQCategoryType[] = useMemo(
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
            _key: faqCategory.title,
            label: faqCategory.title,
            children: <FAQCategory faqCategory={faqCategory} />,
          }))}
        />
      </div>
    </div>
  );
};
