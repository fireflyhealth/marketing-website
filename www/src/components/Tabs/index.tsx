import React, { FC, useState, ReactNode } from 'react';
import cn from 'classnames';
import { Keyed } from '@/types/sanity';
import { TabContentWrapper, TabLabel, TabLabels } from './styles';

type Tab = {
  label: string;
  children: ReactNode;
};

type TabsProps = {
  tabs: Keyed<Tab>[];
};

const getTabId = (tab: Keyed<Tab>) => `tab-${tab._key}`;

/**
 * Tab accessibility requirements:
 *
 * - the Tab key should shift focus from tab labels
 * - the Enter and Space keys should "press" the labels and display the content
 * - When the user has focused on a tab label:
 *  - the Left & Right Arrow keys should switch between tags
 *  - The Home key should select the first tab
 *  - The End key should select the final tab
 *
 * - Clicking on the tab label should show the content
 * - Hovering should indicate an action
 *
 * Read more: https://dev.to/link2twenty/accessibility-first-tabs-ken
 */
export const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]._key);
  const createTabFocusHandler = (key: string) => () => setActiveTab(key);
  const activateAndFocusTab = (tab: Keyed<Tab>) => {
    /* Update the state */
    setActiveTab(tab._key);
    /* Apply the focus to the tab label */
    document.getElementById(getTabId(tab))?.focus();
  };
  const handleKeyUp = (e: React.KeyboardEvent) => {
    const currentIndex = tabs.findIndex((t) => t._key === activeTab);
    switch (e.key) {
      case 'Home':
        activateAndFocusTab(tabs[0]);
        return;
      case 'End':
        activateAndFocusTab(tabs[tabs.length - 1]);
        return;
      case 'ArrowRight':
        const nextIndex =
          currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
        activateAndFocusTab(tabs[nextIndex]);
        return;
      case 'ArrowLeft':
        const prevIndex =
          currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        activateAndFocusTab(tabs[prevIndex]);
        return;
    }
  };
  return (
    <div>
      <ul role="tablist" className={cn(TabLabels)} onKeyUp={handleKeyUp}>
        {tabs.map((tab) => (
          <li
            key={tab._key}
            role="presentation"
            className={cn(
              TabLabel,
              tab._key === activeTab
                ? 'theme-text-color-primary border-b'
                : 'theme-text-color-secondary',
            )}
          >
            <button
              onClick={createTabFocusHandler(tab._key)}
              role="tab"
              id={getTabId(tab)}
              aria-controls={tab._key}
              aria-selected={tab._key === activeTab}
              tabIndex={0}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="relative">
        {tabs.map((tab) => (
          <div
            key={tab._key}
            aria-hidden={tab._key !== activeTab}
            role="tabpanel"
            id={tab._key}
            tabIndex={tab._key === activeTab ? 0 : -1}
            className={cn(
              TabContentWrapper,
              tab._key === activeTab
                ? ''
                : 'absolute opacity-0 height-0 overflow-hidden pointer-events-none',
            )}
          >
            {tab.children}
          </div>
        ))}
      </div>
    </div>
  );
};
