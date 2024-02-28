import React, { FC, useState } from 'react';
import cn from 'classnames';
import { FAQTab as FAQTabType } from '@/types/sanity';
import { Button } from '@/atoms/Button';
import { slugify } from '@/utils/text';
import { FAQTabButtons, FAQTabGroups, FAQTabWrapper } from './styles';
import { FAQGroup } from './FAQGroup';

type FAQTabProps = {
  faqTab: FAQTabType;
};

const getButtonId = (tabTitle: string, label: string) =>
  [slugify(tabTitle), slugify(label)].join('-');

export const FAQTab: FC<FAQTabProps> = ({ faqTab }) => {
  const { title, faqGroups } = faqTab;
  /* 'all' or a group key */
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const createGroupButtonHandler = (key: string) => () => setActiveGroup(key);
  const filteredGroups =
    activeGroup === 'all'
      ? faqGroups
      : faqGroups.filter((group) => group._key === activeGroup);
  return (
    <div className={cn(FAQTabWrapper)}>
      <div className={cn(FAQTabButtons)}>
        <div className="mr-4 pb-4">
          <Button
            variant="outlined"
            active={activeGroup === 'all'}
            onClick={createGroupButtonHandler('all')}
            aria-selected={activeGroup === 'all'}
            id={getButtonId(title, 'All questions')}
            width="auto"
            label="All questions"
          />
        </div>
        {faqGroups.map((faqGroup) => (
          <div key={faqGroup._key} className="mr-4 pb-4">
            <Button
              variant="outlined"
              width="auto"
              aria-selected={activeGroup === faqGroup._key}
              active={activeGroup === faqGroup._key}
              onClick={createGroupButtonHandler(faqGroup._key)}
              id={getButtonId(title, faqGroup.title)}
              label={faqGroup.title}
            />
          </div>
        ))}
      </div>
      <div className={cn(FAQTabGroups)}>
        <div className="border border-red p-4">search input placeholder</div>
        <div>
          {filteredGroups.map((faqGroup) => (
            <FAQGroup key={faqGroup._key} faqGroup={faqGroup} />
          ))}
        </div>
      </div>
    </div>
  );
};
