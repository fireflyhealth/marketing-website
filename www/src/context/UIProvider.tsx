import { FC, createContext, PropsWithChildren, useState } from 'react';

type UIProviderProps = {
  globalNavOpen: boolean;
  setGlobalNavOpen: (open: boolean) => void;
  toggleGlobalNav: () => void;
  currentNavItemRef: HTMLDivElement | null;
  setCurrentNavItemRef: (globalNavItemRef: HTMLDivElement | null) => void;
};

export const UIContext = createContext<UIProviderProps | undefined>(undefined);

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  // Global Nav
  const [globalNavOpen, setGlobalNavOpen] = useState(false);

  const toggleGlobalNav = () => {
    setGlobalNavOpen(!globalNavOpen);
  };

  const [currentNavItemRef, setCurrentNavItemRef] =
    useState<HTMLDivElement | null>(null);

  return (
    <UIContext.Provider
      value={{
        globalNavOpen,
        setGlobalNavOpen,
        toggleGlobalNav,
        currentNavItemRef,
        setCurrentNavItemRef,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
