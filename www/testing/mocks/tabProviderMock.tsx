import { FC, PropsWithChildren } from 'react';
import { TabContext } from '@/components/Tabs';

export const MockTabProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TabContext.Provider value={{ activeTab: '' }}>
      {children}
    </TabContext.Provider>
  );
};
