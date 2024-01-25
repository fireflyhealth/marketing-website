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
  currentNavItem: string | null;
  setCurrentNavItem: (newNavItem: string | null) => void;
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

  /* Uses the nav item's '_key' prop as an identifier */
  const [currentNavItem, setCurrentNavItem] = useState<string | null>(null);

  return (
    <UIContext.Provider
      value={{
        mobileNavOpen,
        setMobileNavOpen,
        toggleGlobalNav,
        currentNavItem,
        setCurrentNavItem,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
