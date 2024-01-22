import {
  FC,
  createContext,
  PropsWithChildren,
  useState,
  useContext,
} from 'react';

type UIProviderProps = {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  toggleGlobalNav: () => void;
  currentNavItemRef: HTMLDivElement | null;
  setCurrentNavItemRef: (globalNavItemRef: HTMLDivElement | null) => void;
};

export const UIContext = createContext<UIProviderProps | undefined>(undefined);

export const useUIProvider = () => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error('useUIProvider must be used within a UIProvider');
  }

  return context;
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  // Global Nav
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleGlobalNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const [currentNavItemRef, setCurrentNavItemRef] =
    useState<HTMLDivElement | null>(null);

  return (
    <UIContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen,
        toggleGlobalNav,
        currentNavItemRef,
        setCurrentNavItemRef,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
