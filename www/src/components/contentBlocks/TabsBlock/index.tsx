import React, { FC } from 'react';
import {
  TabsBlock as TabsBlockType,
  TabsBlockTab as TabsBlockTabType,
} from '@/types/sanity';
import { Tabs } from '@/components/Tabs';
import { ContentBlockWrapper } from '../ContentBlockWrapper';
import { TwoUpObject } from '../TwoUpBlock';

type TabsBlockTabProps = {
  tabsBlockTab: TabsBlockTabType;
};

const TabsBlockTab: FC<TabsBlockTabProps> = ({ tabsBlockTab }) => {
  const { content } = tabsBlockTab;
  switch (content._type) {
    case 'twoUpObject':
      return <TwoUpObject twoUpObject={content} />;
    default:
      throw new Error(
        // @ts-expect-error
        `Type "${content._type.toString()}" is not a valid tab block content type`,
      );
  }
};

type TabsBlockProps = {
  tabsBlock: TabsBlockType;
};

export const TabsBlock: FC<TabsBlockProps> = ({ tabsBlock }) => {
  const { header, tabs, subnav } = tabsBlock;
  return (
    <ContentBlockWrapper header={header} id={subnav?.contentBlockId}>
      <Tabs
        tabs={tabs.map((tab) => ({
          _key: tab._key,
          label: tab.label,
          children: <TabsBlockTab tabsBlockTab={tab} />,
        }))}
      />
    </ContentBlockWrapper>
  );
};
